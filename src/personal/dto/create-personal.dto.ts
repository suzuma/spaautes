
import { IsNotEmpty, IsString } from "class-validator";
export class CreatePersonalDto{
    @IsNotEmpty()    
    id: number;

    @IsNotEmpty()
    @IsString()
    nempleado: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsString()
    puesto: string;

    


}