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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const jwt_1 = require("@nestjs/jwt");
const rol_entity_1 = require("../roles/rol.entity");
let AuthService = class AuthService {
    constructor(usersRepository, rolesRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.jwtService = jwtService;
    }
    async register(user) {
        const { email, phone } = user;
        const emailExists = await this.usersRepository.findOneBy({ email: email });
        if (emailExists) {
            throw new common_1.HttpException('El email ya esta registrado', common_1.HttpStatus.CONFLICT);
        }
        const phoneExist = await this.usersRepository.findOneBy({ phone: phone });
        if (phoneExist) {
            throw new common_1.HttpException('El telefono ya esta registrado', common_1.HttpStatus.CONFLICT);
        }
        const newUser = this.usersRepository.create(user);
        let rolesIds = [];
        if (user.rolesIds !== undefined && user.rolesIds !== null) {
            rolesIds = user.rolesIds;
        }
        else {
            rolesIds.push('GUEST');
        }
        const roles = await this.rolesRepository.findBy({ id: (0, typeorm_2.In)(rolesIds) });
        newUser.roles = roles;
        const userSaved = await this.usersRepository.save(newUser);
        const rolesString = userSaved.roles.map(rol => rol.id);
        const payLoad = {
            id: userSaved.id,
            name: userSaved.name,
            roles: rolesString
        };
        const token = this.jwtService.sign(payLoad);
        const data = {
            user: userSaved,
            token: 'Bearer ' + token
        };
        delete data.user.password;
        return data;
    }
    async login(LoginData) {
        const { email, password } = LoginData;
        const userFound = await this.usersRepository.findOne({
            where: { email: email },
            relations: ['roles']
        });
        if (!userFound) {
            throw new common_1.HttpException('El email no esta registrado', common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(password, userFound.password);
        if (!isPasswordValid) {
            console.log('PASSWORD INCORRECTO');
            throw new common_1.HttpException('La contraseña es incorrecta', common_1.HttpStatus.FORBIDDEN);
        }
        const rolesIds = userFound.roles.map(rol => rol.id);
        const payLoad = {
            id: userFound.id,
            name: userFound.name,
            roles: rolesIds
        };
        const token = this.jwtService.sign(payLoad);
        const data = {
            user: userFound,
            token: 'Bearer ' + token
        };
        delete data.user.password;
        return data;
    }
    finAll() {
        return this.usersRepository.find();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map