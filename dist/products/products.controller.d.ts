import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    pagination(page?: number, limit?: number): Promise<Pagination<Product>>;
    findByCategory(id_category: number): Promise<Product[]>;
    findByName(name: string): Promise<Product[]>;
    create(files: Array<Express.Multer.File>, product: CreateProductDto): Promise<Product>;
    updateWithImage(files: Array<Express.Multer.File>, id: number, product: UpdateProductDto): Promise<Product & UpdateProductDto>;
    update(id: number, product: UpdateProductDto): Promise<Product & UpdateProductDto>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
