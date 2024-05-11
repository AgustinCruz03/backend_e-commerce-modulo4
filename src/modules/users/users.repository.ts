import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModifyUserDto } from 'src/Dtos/ModifyUser.dto';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  

  async getUsers(page = 1, limit = 5) {
    const startIndex = (page - 1) * limit;
    const usersMaps = await this.userRepository.find({relations:{orders:true}, skip:startIndex, take:limit});

    
    return usersMaps.map(user =>{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password, isAdmin,...userRest} = user
      return userRest
    })
}


  async getUserById(id: string) {
    const usuarioEncontrado = await this.userRepository.findOne({where:{id}, relations:{orders:true}})
    if(!usuarioEncontrado) throw new NotFoundException("Usuario no encontrado")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
      let userSinPassword = (({ password, isAdmin,...resto }) => resto)(usuarioEncontrado);
      return userSinPassword;
    
  }

  // async createUser(user:CreateUserDto ){
  //   return await this.userRepository.save(user)
  // }

  async modifyUser(user:ModifyUserDto){
    let userBuscado = await this.userRepository.findOne({where:{id:user.id}})
    if(userBuscado){
       userBuscado = {...userBuscado, ...user}
    }else{
      throw new NotFoundException(`Usuario con id ${user.id} no encontrado`) 
    }
    return await this.userRepository.save(userBuscado)
  }

  async deleteUser(id:string){
    await this.userRepository.delete(id)
    return id
  }
}
