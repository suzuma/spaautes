import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    create(file: Express.Multer.File, category: CreateCategoryDto): Promise<Category>;
    update(id: number, category: UpdateCategoryDto): Promise<Category & UpdateCategoryDto>;
    updateWithImage(file: Express.Multer.File, id: number, category: UpdateCategoryDto): Promise<Category & UpdateCategoryDto>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
