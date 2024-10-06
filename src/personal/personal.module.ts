import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './personal.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [ TypeOrmModule.forFeature([ Personal ]) ],
  providers: [PersonalService,JwtStrategy],
  controllers: [PersonalController]
})
export class PersonalModule {}
