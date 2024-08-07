import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    findAll(): Promise<User[]>;
    create(user: CreateUserDto): Promise<User>;
    update(id: number, user: UpdateUserDto): Promise<User & UpdateUserDto>;
    updateWithImage(file: Express.Multer.File, id: number, user: UpdateUserDto): Promise<User & UpdateUserDto>;
}
