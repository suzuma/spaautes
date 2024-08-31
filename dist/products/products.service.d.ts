import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findByCategory(id_category: number): Promise<Product[]>;
    paginate(options: IPaginationOptions): Promise<Pagination<Product>>;
    findByName(name: string): Promise<Product[]>;
    create(files: Array<Express.Multer.File>, product: CreateProductDto): Promise<Product>;
    updateWithImages(files: Array<Express.Multer.File>, id: number, product: UpdateProductDto): Promise<Product & UpdateProductDto>;
    update(id: number, product: UpdateProductDto): Promise<Product & UpdateProductDto>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
