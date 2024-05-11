import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CloudinaryService } from "src/cloudinary.service";
import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesRepository{
    constructor(
        private readonly cloudinaryService:CloudinaryService,
        @InjectRepository(Product) private productRepository: Repository<Product>
        ){}

    async uploadImage(id:string,file:Express.Multer.File){
        const repositorioBuscado = await this.productRepository.findOne({where:{id}})
        if(!repositorioBuscado)throw new NotFoundException("Producto no encontrado")

        const image =  await this.cloudinaryService.uploadImage(file)
        repositorioBuscado.imgUrl = image.secure_url
        return await this.productRepository.save(repositorioBuscado)
    }
}