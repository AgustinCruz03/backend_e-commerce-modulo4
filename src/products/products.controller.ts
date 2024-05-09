import { Controller, Get, Param, Post, Put, Query, Delete, UseGuards, Body, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/AuthGuards';
import { ModifyProductDto } from 'src/Dtos/ModifyProduct.dto';
import { RoleGuard } from 'src/guards/RoleGuard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/Dtos/CreateProduct.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @ApiBearerAuth()
  @Get()
  // @UseGuards(AuthGuard)
  getProducts(@Query('page') page: number | undefined, @Query('limit') limit: number | undefined) {
    return this.productsService.getProducts(page, limit);
  }

  // @ApiBearerAuth()
  @Get(':id')
  // @UseGuards(AuthGuard)
  getProductsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductsById(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RoleGuard)
  postProduct(@Body() product: CreateProductDto) {
    return this.productsService.postProduct(product);
  }

  @Post('seeder')
  seeder(){
    return this.productsService.seeder()
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RoleGuard)
  modifyProduct(@Param('id', ParseUUIDPipe) id:string, @Body() product:ModifyProductDto) {
    return this.productsService.modifyProduct(id,product)
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RoleGuard)
  deleteProduct(@Param('id',ParseUUIDPipe) id: string){
    return this.productsService.deleteProduct(id)
  }
}

