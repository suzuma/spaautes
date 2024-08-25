import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesService } from './categories.service';
import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRole } from 'src/auth/jwt/jwt-rol';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private CategoriesService: CategoriesService){}


    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Post()  //https....../categories
    @UseInterceptors(FileInterceptor('file')) //ASI ES EL NOMBRE 
    updateWithImage( @UploadedFile(
        new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)'}),
            ],
          }),
    ) file: Express.Multer.File, 
    @Body() user: CreateCategoryDto){
    
        
        return this.CategoriesService.create(file, user);
    }
}
