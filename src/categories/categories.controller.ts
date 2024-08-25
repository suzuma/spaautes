import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesService } from './categories.service';
import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRole } from 'src/auth/jwt/jwt-rol';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private CategoriesService: CategoriesService) {}

    @HasRoles(JwtRole.CLIENT, JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll() {
        return this.CategoriesService.findAll()
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)    
    @Post() // http:localhost:3000/categories -> POST
    @UseInterceptors(FileInterceptor('file'))
    createWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                  new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
              }),
        ) file: Express.Multer.File,
        @Body() category: CreateCategoryDto
    ) {
        return this.CategoriesService.create(file,category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id')
    update( @Param('id', ParseIntPipe) id: number, @Body() category: UpdateCategoryDto) {
        return this.CategoriesService.update(id, category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put('upload/:id') // http:localhost:3000/categories -> PUT
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                  new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
              }),
        ) file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() category: UpdateCategoryDto
    ) {
        return this.CategoriesService.updateWithImage(file, id, category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.CategoriesService.delete(id);
    }
}
