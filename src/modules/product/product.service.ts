import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/dtos/filter.dto';
import { ProductDto } from 'src/dtos/product.dto';
import { Users } from 'src/entities/User.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getAllProducts(filters: FilterDto, page: number, limit: number) {
    let products = await this.productRepository.find();
    const { category, abv, brand, country, size } = filters;
    if (category)
      products = products.filter((product) => product.category === category);
    if (abv) products = products.filter((product) => product.abv === abv);
    if (brand) products = products.filter((product) => product.brand === brand);
    if (country)
      products = products.filter((product) => product.country === country);
    if (size) products = products.filter((product) => product.size === size);
    const start = (page - 1) * limit;
    const end = start + limit;
    const productsSlice = products.slice(start, end);
    return productsSlice;
  }

  async getProduct(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async createProduct(product: ProductDto, id: string) {
    const newProduct = new Product();

    const user = await this.userRepository.findOneBy({ id });

    newProduct.seller = user;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.category = product.category;
    newProduct.country = product.country;
    newProduct.imgUrl = product.imgUrl;
    newProduct.abv = product.abv;
    newProduct.brand = product.brand;
    newProduct.size = product.size;

    await this.productRepository.save(newProduct);
    const isProduct = await this.productRepository.findOneBy({
      name: newProduct.name,
    });

    user.products_id = isProduct;

    await this.userRepository.update(user.id, user);

    return isProduct;
  }

  async updateProduct(id: string, product: ProductDto) {
    await this.productRepository.update(id, product);
    const updateProduct = await this.productRepository.findOne({
      where: { id },
    });
    return updateProduct;
  }

  //cambiar id a string
  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
    return { message: `el producto ha sido eliminado` };
  }
}