import { PersonalService } from './personal.service';
export declare class PersonalController {
    private personalService;
    constructor(personalService: PersonalService);
    findAll(): Promise<import("./personal.entity").Personal[]>;
}
