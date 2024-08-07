import { IsNotEmpty, IsString } from "class-validator";


export class UpdateUserDto{
    
   // @IsNotEmpty()
   // @IsString()
    name?:string;
    
   // @IsNotEmpty()
    //@IsString()
    lasname?:string;

   // @IsNotEmpty()
    //@IsString()
    phone?:string;

    imagen?:string;
    notification_token?:string;
}