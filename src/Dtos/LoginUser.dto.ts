import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginUserDto{

    /** 
    * El email debe ser un email valido
    * @example romina@mail.com
    */
    @IsEmail()
    @IsNotEmpty()
    email:string

    /** 
    * La contraseña debe ser una contraseña dificil de descifrar
    * @example ddddddddD@2
    */
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    password:string
}