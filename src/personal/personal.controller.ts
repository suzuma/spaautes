import { Controller, Get, Param } from '@nestjs/common';
import { PersonalService } from './personal.service';

@Controller('personal')
export class PersonalController {
    constructor(private personalService: PersonalService) {}


    @Get() // http:localhost:3000/categories -> GET
    findAll() {
        return this.personalService.findAll();
    }

    @Get('buscar/:name') // http:localhost:3000/categories -> GET
    findByName(@Param('name') name: string) {
        return this.personalService.findByName(name);
    }

    @Get('puesto/:name') // http:localhost:3000/categories -> GET
    findByRol(@Param('name') name: string) {
        return this.personalService.findByRol(name);
    }

}
