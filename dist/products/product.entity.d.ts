import { Category } from "src/categories/category.entity";
export declare class Product {
    id: number;
    name: string;
    description: string;
    image1: string;
    image2: string;
    id_category: number;
    price: number;
    created_at: Date;
    updated_at: Date;
    category: Category;
}
