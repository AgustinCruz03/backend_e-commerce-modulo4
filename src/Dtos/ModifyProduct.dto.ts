import { ApiHideProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsNumber, MaxLength } from "class-validator"

export class ModifyProductDto{

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    @MaxLength(13)
    price: number

    @IsOptional()
    @IsNumber()
    stock: number

    @ApiHideProperty()
    @IsOptional()
    @IsString()
    imgUrl: string

    @IsOptional()
    @IsString()
    category:string

}

