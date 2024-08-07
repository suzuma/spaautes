import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { Rol } from 'src/roles/rol.entity';



@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Rol]),    
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' }, //2d  60s
    }),
  ],
  providers: [AuthService,AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
