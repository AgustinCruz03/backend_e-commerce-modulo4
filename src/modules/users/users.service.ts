import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ModifyUserDto } from 'src/Dtos/ModifyUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  getUsers(page:number | undefined , limit:number | undefined) {
    return this.userRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  // createUser(user:CreateUserDto){
  //   return this.userRepository.createUser(user)
  // }

  modifyUser(user:ModifyUserDto){
    return this.userRepository.modifyUser(user)
  }

  deleteUser(id:string){
    return this.userRepository.deleteUser(id)
  }
}

