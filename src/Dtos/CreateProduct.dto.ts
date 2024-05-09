import { ApiHideProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator"

export class CreateProductDto{
    /** 
    * El nombre debe ser una cadena de minimo 4 letras
    * @example thunderLaptop
    */
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    name:string

    /** 
    * La descripcion debe ser una cadena
    * @example Esta es una computadora gamer de ultima generación
    */
    @IsNotEmpty()
    @IsString()
    description:string
    
    /** 
    * El precio debe ser un numero
    * @example 300.80
    */
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01, { message: 'Price must be at least 0.01' })
    @Max(9999999.99, { message: 'Price cannot exceed 9999999.99' })
    price:number

    /** 
    * El stock debe ser un numero mayor a cero
    * @example 50
    */
    @IsInt()
    @IsNotEmpty()
    stock:number

    @ApiHideProperty()
    @IsString()
    imgUrl:string = "https://upload.wikimedia.org/wikipedia/commons/6/64/Ejemplo.png"

    /** 
    * La categoria debe ser una categoria registrada
    * @example Smartphone
    */
    @IsString()
    @IsNotEmpty()
    category:string
}

