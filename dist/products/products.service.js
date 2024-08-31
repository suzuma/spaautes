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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const storage = require("../utils/cloud_storage");
const asyncForEach = require("../utils/async_foreach");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    findAll() {
        return this.productsRepository.find();
    }
    findByCategory(id_category) {
        return this.productsRepository.findBy({ id_category: id_category });
    }
    async paginate(options) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.productsRepository, options);
    }
    findByName(name) {
        return this.productsRepository.find({ where: { name: (0, typeorm_2.Like)(`%${name}%`) } });
    }
    async create(files, product) {
        if (files.length === 0) {
            throw new common_1.HttpException("Las imagenes son obligatorias", common_1.HttpStatus.NOT_FOUND);
        }
        let uploadedFiles = 0;
        const newProduct = this.productsRepository.create(product);
        const savedProduct = await this.productsRepository.save(newProduct);
        const startForEach = async () => {
            await asyncForEach(files, async (file) => {
                const url = await storage(file, file.originalname);
                if (url !== undefined && url !== null) {
                    if (uploadedFiles === 0) {
                        savedProduct.image1 = url;
                    }
                    else if (uploadedFiles === 1) {
                        savedProduct.image2 = url;
                    }
                }
                await this.update(savedProduct.id, savedProduct);
                uploadedFiles = uploadedFiles + 1;
            });
        };
        await startForEach();
        return savedProduct;
    }
    async updateWithImages(files, id, product) {
        if (files.length === 0) {
            throw new common_1.HttpException("Las imagenes son obligatorias", common_1.HttpStatus.NOT_FOUND);
        }
        let counter = 0;
        let uploadedFiles = Number(product.images_to_update[counter]);
        const updatedProduct = await this.update(id, product);
        const startForEach = async () => {
            await asyncForEach(files, async (file) => {
                const url = await storage(file, file.originalname);
                if (url !== undefined && url !== null) {
                    if (uploadedFiles === 0) {
                        updatedProduct.image1 = url;
                    }
                    else if (uploadedFiles === 1) {
                        updatedProduct.image2 = url;
                    }
                }
                await this.update(updatedProduct.id, updatedProduct);
                counter++;
                uploadedFiles = Number(product.images_to_update[counter]);
            });
        };
        await startForEach();
        return updatedProduct;
    }
    async update(id, product) {
        const productFound = await this.productsRepository.findOneBy({ id: id });
        console.log('Product found: ', productFound);
        if (!productFound) {
            throw new common_1.HttpException("Producto no encontrado", common_1.HttpStatus.NOT_FOUND);
        }
        const updatedProduct = Object.assign(productFound, product);
        console.log('Product Updated:', updatedProduct);
        return this.productsRepository.save(updatedProduct);
    }
    async delete(id) {
        const productFound = await this.productsRepository.findOneBy({ id: id });
        if (!productFound) {
            throw new common_1.HttpException("Producto no encontrado", common_1.HttpStatus.NOT_FOUND);
        }
        return this.productsRepository.delete(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map