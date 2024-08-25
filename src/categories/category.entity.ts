import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'categories_app'})
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    descripcion: string;

    @Column()
    image: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


}