import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";
import {TypeOrmModule} from "@nestjs/typeorm"
import { Category } from "src/entities/categories.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Category])],
    controllers:[CategoryController],
    providers:[CategoryService, CategoryRepository]
})
export class CategoryModule{

}