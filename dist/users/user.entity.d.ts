import { Rol } from 'src/roles/rol.entity';
export declare class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    imagen: string;
    notification_token: string;
    password: string;
    create_at: Date;
    updated_at: Date;
    roles: Rol[];
    hashPassword(): Promise<void>;
}
