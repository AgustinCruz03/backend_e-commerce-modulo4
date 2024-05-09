import { Controller, Get, Post} from "@nestjs/common"
import { CategoryService } from "./category.service"
import { ApiTags } from "@nestjs/swagger"


@ApiTags('Categories')
@Controller('categories')
export class CategoryController{
    constructor(private readonly categoryService:CategoryService){}
    
    @Post('seeder')
    seeder(){
        return this.categoryService.addCategory()
    }

    @Get()
    getCategories(){
        return this.categoryService.getCategories()
    }
}