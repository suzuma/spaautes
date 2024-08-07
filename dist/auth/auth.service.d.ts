import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';
export declare class AuthService {
    private usersRepository;
    private rolesRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, rolesRepository: Repository<Rol>, jwtService: JwtService);
    register(user: RegisterAuthDto): Promise<{
        user: User;
        token: string;
    }>;
    login(LoginData: LoginAuthDto): Promise<{
        user: User;
        token: string;
    }>;
    finAll(): Promise<User[]>;
}
