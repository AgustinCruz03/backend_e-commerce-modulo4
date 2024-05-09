import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.repository";

@Injectable()
export class CategoryService{
    constructor(private readonly categoryRepository:CategoryRepository){}

    addCategory(){
        return this.categoryRepository.addCategory()
    }

    getCategories(){
        return this.categoryRepository.getCategories()
    }
}