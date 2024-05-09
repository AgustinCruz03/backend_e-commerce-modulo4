import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ModifyProductDto } from 'src/Dtos/ModifyProduct.dto';
import { CreateProductDto } from 'src/Dtos/CreateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(page: number | undefined, limit: number | undefined) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductsById(id: string) {
    return this.productsRepository.getProductsById(id);
  }

  postProduct(product: CreateProductDto) {
    return this.productsRepository.postProduct(product);
  }
  seeder() {
    return this.productsRepository.seeder();
  }

  modifyProduct(id:string,product: ModifyProductDto) {
    return this.productsRepository.modifyProduct(id,product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}

