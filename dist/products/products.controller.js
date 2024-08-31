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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const has_roles_1 = require("../auth/jwt/has-roles");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const jwt_rol_1 = require("../auth/jwt/jwt-rol");
const jwt_roles_guard_1 = require("../auth/jwt/jwt-roles.guard");
const config_1 = require("../config/config");
const update_product_dto_1 = require("./dto/update-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const create_product_dto_1 = require("./dto/create-product.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAll() {
        return this.productsService.findAll();
    }
    async pagination(page = 1, limit = 5) {
        return this.productsService.paginate({
            page,
            limit,
            route: `http://${config_1.API}:4000/products/pagination`
        });
    }
    findByCategory(id_category) {
        return this.productsService.findByCategory(id_category);
    }
    findByName(name) {
        return this.productsService.findByName(name);
    }
    create(files, product) {
        console.log('Files: ', files);
        console.log('Product: ', product);
        return this.productsService.create(files, product);
    }
    updateWithImage(files, id, product) {
        console.log('PRoduct: ', product);
        return this.productsService.updateWithImages(files, id, product);
    }
    update(id, product) {
        return this.productsService.update(id, product);
    }
    delete(id) {
        return this.productsService.delete(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN, jwt_rol_1.JwtRole.CLIENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN, jwt_rol_1.JwtRole.CLIENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "pagination", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN, jwt_rol_1.JwtRole.CLIENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Get)('category/:id_category'),
    __param(0, (0, common_1.Param)('id_category', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findByCategory", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN, jwt_rol_1.JwtRole.CLIENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Get)('search/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findByName", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files[]', 2)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Put)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files[]', 2)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    }))),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateWithImage", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, has_roles_1.HasRoles)(jwt_rol_1.JwtRole.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.JwtRolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "delete", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map