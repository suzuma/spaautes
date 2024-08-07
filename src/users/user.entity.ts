
import { hash } from 'bcrypt';
import { Rol } from 'src/roles/rol.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable } from "typeorm";

@Entity({name: "usuarios_app"})
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    lastName: string;
    
    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    imagen: string;

    @Column({ nullable: true })
    notification_token: string;
    
    @Column()
    password: string;

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    create_at: Date;

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    //PARA INDICAR QUE LA TABLA ES LA PRINCIPAL DE LA RELACION
    @JoinTable({
        name: 'user_has_roles',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[];
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }


}