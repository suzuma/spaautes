import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private CategoriesService;
    constructor(CategoriesService: CategoriesService);
    findAll(): Promise<import("./category.entity").Category[]>;
    createWithImage(file: Express.Multer.File, category: CreateCategoryDto): Promise<import("./category.entity").Category>;
    update(id: number, category: UpdateCategoryDto): Promise<import("./category.entity").Category & UpdateCategoryDto>;
    updateWithImage(file: Express.Multer.File, id: number, category: UpdateCategoryDto): Promise<import("./category.entity").Category & UpdateCategoryDto>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
