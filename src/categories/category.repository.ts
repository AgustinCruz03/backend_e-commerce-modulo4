import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from "../utils/productsPrecargados.json"

@Injectable()
export class CategoryRepository{

    constructor(@InjectRepository(Category) private categoryRepositoryInDB: Repository<Category>){}

    async addCategory(){
        for(const product of data){
            const categoriaExiste = await this.categoryRepositoryInDB.findOne({where:{name:product.category}})
            if(!categoriaExiste){
                const categoriaNueva = new Category()
                categoriaNueva.name = product.category
                await this.categoryRepositoryInDB.save(categoriaNueva)
            }
        }
        return "Las categorias ya estan cargadas"
    }

    async getCategories(){
        return await this.categoryRepositoryInDB.find()
    }
}