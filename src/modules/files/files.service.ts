import { Injectable } from "@nestjs/common";
import { FilesRepository } from "./files.repository";
import { Express } from "express";


@Injectable()
export class FilesService{
    constructor(private readonly filesRepository:FilesRepository){}
    
    uploadImage(id:string,file:Express.Multer.File){
        return this.filesRepository.uploadImage(id,file)
    }
}