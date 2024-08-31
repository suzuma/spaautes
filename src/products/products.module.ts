import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Product, Category ]) ],
  providers: [ProductsService, JwtStrategy],
  controllers: [ProductsController]
})
export class ProductsModule {}
