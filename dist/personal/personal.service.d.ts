import { Personal } from './personal.entity';
import { Repository } from 'typeorm';
import { CreatePersonalDto } from './dto/create-personal.dto';
export declare class PersonalService {
    private PersonalRepository;
    constructor(PersonalRepository: Repository<Personal>);
    findAll(): Promise<Personal[]>;
    findByName(name: string): Promise<Personal[]>;
    findByRol(name: string): Promise<Personal[]>;
    create(rol: CreatePersonalDto): Promise<Personal>;
}
