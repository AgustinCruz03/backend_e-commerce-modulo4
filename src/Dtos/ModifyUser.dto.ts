import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ModifyUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'Password requires lowercase, uppercase, number, and special character: !@#$%^&*',
  })
  @MaxLength(15)
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsInt()
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  city: string;
}
