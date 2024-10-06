import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name:"personal_uth"})
export  class Personal{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;

    @Column()
    nempleado: string;

    @Column()
    puesto: string;

    @Column()
    comentarios: string;
    
    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fecha_ingreso: Date;

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fecha_promocion: Date;


    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    create_at: Date;

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

}