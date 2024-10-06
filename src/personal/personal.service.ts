
import { Injectable } from '@nestjs/common';
import { Personal } from './personal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePersonalDto } from './dto/create-personal.dto';

@Injectable()
export class PersonalService {
    constructor(@InjectRepository(Personal) 
    private PersonalRepository: Repository<Personal>) {}

    findAll() {
        return this.PersonalRepository.find();
    }

    findByName(name: string) {
        return this.PersonalRepository.find({ where : { nombre: Like(`%${name}%`) }})
    }

    create(rol: CreatePersonalDto) {
        const newRol = this.PersonalRepository.create(rol);
        return this.PersonalRepository.save(newRol);
    }
}
