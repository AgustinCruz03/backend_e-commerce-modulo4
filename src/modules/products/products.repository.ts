import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';
import * as seed from "../../utils/productsPrecargados.json"
import { ModifyProductDto } from 'src/Dtos/ModifyProduct.dto';
import { CreateProductDto } from 'src/Dtos/CreateProduct.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}
  
    async getProducts(page = 1, limit = 5) {
      const startIndex = (page - 1) * limit;
  
      const products = await this.productsRepository.find({
        relations: {
          category:true
        }, 
        skip: startIndex,
        take: limit,
      });
  
      return products;
  }
  

  async getProductsById(id: string) {
    const productBuscado = await this.productsRepository.findOne({where:{id}})
    if(!productBuscado) throw new NotFoundException("producto no encontrado por id")
    return productBuscado
  }

  async postProduct(product: CreateProductDto) {
    const { category, name, description, price, stock, imgUrl } = product;
    const categorySearched = await this.categoryRepository.findOne({ where: { name: category } });
    
    if (!categorySearched) {
      throw new NotFoundException("No existe esa categoria en la base de datos");
    }
  
    const productCompleto = this.productsRepository.create({
      name,
      description,
      price,
      stock,
      imgUrl,
      category: categorySearched
    });
  
    return await this.productsRepository.save(productCompleto);
  }
  

  async seeder(){
    const response = []
    const existe = await this.productsRepository.find()
    if(existe.length > 0) return "Existen productos cargados"
    for(const product of seed){
      response.push(await this.productsRepository.save({...product, category: await this.categoryRepository.findOne({where:{name:product.category}})}))
    }
    return response
  }

  async modifyProduct(id:string,product: ModifyProductDto) {
    let productoBuscado = await this.productsRepository.findOne({where:{id}})
    if(!productoBuscado)throw new NotFoundException("Producto no encontrado")
      const categoriaExiste = await this.categoryRepository.findOne({where:{name:product.category}})
    if(categoriaExiste){
      productoBuscado = {...productoBuscado, ...product, category:categoriaExiste}
    }else{
      const nuevaCategoria = await this.categoryRepository.save({name:product.category})
      productoBuscado = {...productoBuscado, ...product, category:nuevaCategoria}
    }
    
    return await this.productsRepository.save(productoBuscado)
  }

  async deleteProduct(id: string) {
     await this.productsRepository.delete(id)
     return id
  }
}
