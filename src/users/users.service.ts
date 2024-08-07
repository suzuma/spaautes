import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

import storage = require('../utils/cloud_storage');
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class UsersService {
    constructor(    
        @InjectRepository (User) private usersRepository: Repository<User>,
        
    ){}

    create(user: CreateUserDto) {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    findAll() {
        return this.usersRepository.find(
            {
                relations: ['roles']
            }
        );
    }

   async update(id:number, user:UpdateUserDto){
        const userFound= await this.usersRepository.findOneBy({id:id}); 
        if(!userFound){
            throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
        }

        const updatedUser=Object.assign(userFound, user);
        return this.usersRepository.save(updatedUser);
    }

async updateWithImage(file: Express.Multer.File, id:number, user:UpdateUserDto){
    const url = await storage(file, file.originalname);
        console.log('URL: ' + url);
        if (url === undefined && url === null) {
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const userFound = await this.usersRepository.findOneBy({id: id});
        if (!userFound) {
            throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
        }
        user.imagen = url;
        const updatedUser = Object.assign(userFound, user);
        return this.usersRepository.save(updatedUser);


}






}
