import { Product } from "src/products/product.entity";
export declare class Category {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    product: Product;
}
