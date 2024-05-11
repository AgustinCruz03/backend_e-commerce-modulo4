import { Module } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary";
import { FilesController } from "./files.controller";
import { Product } from "src/entities/products.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesService } from "./files.service";
import { FilesRepository } from "./files.repository";


@Module({
    imports:[TypeOrmModule.forFeature([Product])],
    controllers:[FilesController],
    providers:[CloudinaryConfig, CloudinaryService, FilesService, FilesRepository]
})
export class FilesModule{}