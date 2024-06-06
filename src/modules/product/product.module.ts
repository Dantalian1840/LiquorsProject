import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
import { Users } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Users])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
