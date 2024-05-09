import { ApiHideProperty } from '@nestjs/swagger'
import {IsEmail, IsEmpty, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator'

export class CreateUserDto{
    /** 
    * El usuario debe ser una cadena de minimo 4 letras
    * @example agustin
    */
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    @MinLength(3)
    name: string

    /** 
    * El email debe ser un email valido
    * @example agustin@mail.com
    */

    @IsEmail()
    @IsNotEmpty()
    email:string

    /** 
    * La contraseña debe ser una contraseña dificil de descifrar
    * @example aaBB@@89
    */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,{message: 'Password requires lowercase, uppercase, number, and special character: !@#$%^&*'})
    @MaxLength(15)
    @MinLength(8)
    @IsNotEmpty()
    password: string

    /** 
    * La contraseña debe ser una contraseña dificil de descifrar
    * @example aaBB@@89
    */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,{message: 'Password requires lowercase, uppercase, number, and special character: !@#$%^&*'})
    @MaxLength(15)
    @MinLength(8)
    @IsNotEmpty()
    passwordRepite:string

    /** 
    * el telefono debe ser un numero
    * @example 18883766
    */
    @IsNotEmpty()
    @IsInt()
    phone: number

    /** 
    * el País debe ser un pais de minimo 5 letras
    * @example Alemania
    */
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsNotEmpty()
    country: string

    @MinLength(3)
    @MaxLength(80)
    @IsNotEmpty()
    address: string


    @ApiHideProperty()
    @IsEmpty()
    isAdmin:boolean

    /** 
    * La ciudad debe ser un string de minimo 3 caracteres
    * @example Berlín
    */
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    @IsNotEmpty()
    city: string
}