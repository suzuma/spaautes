import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';


@Injectable()
export class AuthService {
    constructor ( 
        @InjectRepository (User) private usersRepository: Repository<User>,
        @InjectRepository (Rol) private rolesRepository: Repository<Rol>,
        private jwtService: JwtService
    ){
    }

   async register(user: RegisterAuthDto) {
        const { email, phone } = user;
        const emailExists= await this.usersRepository.findOneBy({email:email});
        if(emailExists){
            // 409 CONFLICT
            throw new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExist = await this.usersRepository.findOneBy({phone: phone});

        if (phoneExist) {
            throw new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT)
        }


        const newUser = this.usersRepository.create(user);

        let rolesIds = [];
        if (user.rolesIds !== undefined && user.rolesIds !== null) { // DATA
            rolesIds = user.rolesIds;
        }
        else {
            rolesIds.push('GUEST')
        }
        const roles = await this.rolesRepository.findBy({ id: In(rolesIds) });
        newUser.roles = roles;

        const userSaved= await this.usersRepository.save(newUser);
        const rolesString = userSaved.roles.map(rol => rol.id); //['CLIENT', 'ADMIN']
        const payLoad = { 
            id: userSaved.id, 
            name: userSaved.name, 
            roles: rolesString 
        };
        const token=this.jwtService.sign(payLoad);
        const data={
            user:userSaved,
            token: 'Bearer ' + token
        };
        delete data.user.password;
        return data;
    }

    
    async login(LoginData: LoginAuthDto){
        const {email, password}=LoginData;
        const userFound = await this.usersRepository.findOne({ 
            where: { email: email },
            relations: ['roles']
         })

        if(!userFound){
            throw new HttpException('El email no esta registrado', HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await compare(password, userFound.password);
        if (!isPasswordValid) {
            console.log('PASSWORD INCORRECTO');            
            // 403 FORBITTEN access denied
            throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }
        
        const rolesIds = userFound.roles.map(rol => rol.id); //['CLIENT', 'ADMIN', 'GUEST']
        const payLoad={
            id: userFound.id, 
            name: userFound.name, 
            roles: rolesIds 
        };
        const token=this.jwtService.sign(payLoad);
        const data={
            user:userFound,
            token: 'Bearer ' + token
        };
        delete data.user.password;
        return data;

    }

    finAll(){
        return this.usersRepository.find();
    }
}

    

