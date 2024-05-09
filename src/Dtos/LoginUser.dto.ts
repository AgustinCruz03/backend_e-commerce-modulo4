import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginUserDto{

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
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    password:string
}