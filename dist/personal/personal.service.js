"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalService = void 0;
const common_1 = require("@nestjs/common");
const personal_entity_1 = require("./personal.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PersonalService = class PersonalService {
    constructor(PersonalRepository) {
        this.PersonalRepository = PersonalRepository;
    }
    findAll() {
        return this.PersonalRepository.find();
    }
    findByName(name) {
        return this.PersonalRepository.find({ where: { nombre: (0, typeorm_2.Like)(`%${name}%`) } });
    }
    findByRol(name) {
        return this.PersonalRepository.find({ where: { puesto: (0, typeorm_2.Like)(`%${name}%`) } });
    }
    create(rol) {
        const newRol = this.PersonalRepository.create(rol);
        return this.PersonalRepository.save(newRol);
    }
};
exports.PersonalService = PersonalService;
exports.PersonalService = PersonalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(personal_entity_1.Personal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PersonalService);
//# sourceMappingURL=personal.service.js.map