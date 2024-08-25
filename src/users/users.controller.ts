import { UsersService } from './users.service';
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    // GET OBTENER
    // POST CREAR
    // PUT PATCH ACTUALIZAR
    // DELETE BORRAR

    @HasRoles(JwtRole.ADMIN)    
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get('')
    findAll() //http://localhost:3000/users/ => POST
    {
        return this.userService.findAll();
    }
    
    
    @Post()  // http://localhost:3000/users  -> POST
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put(':id')  // http://localhost:3000/users/:id  -> POST
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file')) //ASI ES EL NOMBRE DE LA VARIABLEA ENIAR DESDE LA APP
    //updateWithImage( @UploadedFile() file: Express.Multer.File){  // SUBIR UN ARCHIVO CUALQUIER Y TAMAÑA CUALQUIERA
      /*  updateWithImage( @UploadedFile(
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                  new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
              }),
        ) file: Express.Multer.File){
            */   // PARA LIMITAR EL TAMAÑO Y FORMATTO DEL ARCHIVO
    updateWithImage( @UploadedFile(
        new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)'}),
            ],
          }),
    ) file: Express.Multer.File,@Param('id', ParseIntPipe) id: number, 
    @Body() user: UpdateUserDto){
    
        
        return this.userService.updateWithImage(file, id, user);
    }



}
