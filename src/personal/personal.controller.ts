import { Controller, Get } from '@nestjs/common';
import { PersonalService } from './personal.service';

@Controller('personal')
export class PersonalController {
    constructor(private personalService: PersonalService) {}


    @Get() // http:localhost:3000/categories -> GET
    findAll() {
        return this.personalService.findAll();
    }
}
