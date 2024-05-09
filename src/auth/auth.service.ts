import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credential: LoginUserDto) {
    const { email, password } = credential;
    const userBuscado = await this.userRepository.findOne({ where: { email } });
    if (!userBuscado) throw new BadRequestException('Credenciales Incorrectas');
    
    const passwordIsValid = await bcrypt.compare(
      password,
      userBuscado.password,
    );
    if (!passwordIsValid) throw new BadRequestException('Credenciales Incorrectas');
    const userPayload = {
      sub: userBuscado.id,
      id: userBuscado.id,
      email: userBuscado.email,
      isAdmin:userBuscado.isAdmin,
    };
//(await this.userRepository.findOne({where:{id:userBuscado.id}})).isAdmin ? Role.ADMIN: Role.USER
    const token = this.jwtService.sign(userPayload);
    return { succes: 'User logged in succesfully', token };
  }

  async signUp(user: CreateUserDto) {
    const userDB = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userDB) throw new BadRequestException('Email already exist');
  
    if (!user.password || !user.passwordRepite || user.password !== user.passwordRepite) {
      throw new BadRequestException('Incorrect registration passwords');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) throw new BadRequestException('password could not be hashed');
    const userDBPasswordHashed = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, passwordRepite, ...userRest } = userDBPasswordHashed;
    return { userRest };
  }
}

