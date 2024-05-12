import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  /** 
    * El id de usuario debe ser un UUID
    * @example 550e8400-e29b-41d4-a716-446655440000
    */
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;

  /** 
 * Los productos deben ser un array de objetos que contengan únicamente el id del producto 
 * @example [{"id":"25f5152e-cd77-4299-abb2-af36fed793e0"}]
 */ 
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}
