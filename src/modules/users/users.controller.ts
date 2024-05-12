import { Controller, Get, Param , Body, Put, Delete, Query, UseGuards, ParseUUIDPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/AuthGuards';
import { ModifyUserDto } from 'src/Dtos/ModifyUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './role.enum';
import { RoleGuard } from 'src/guards/RoleGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @ApiBearerAuth() //Esto es de openApi, Para que lo protega el candado en la documentacion
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  getUsers(@Query('page') page: number | undefined, @Query('limit') limit: number | undefined) {
    return this.usersService.getUsers(page,limit);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put()
  @UseGuards(AuthGuard)
  modifyUser(@Body() user:ModifyUserDto ){
    return this.usersService.modifyUser(user)
  }

  @ApiBearerAuth()
  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id:string){
    return this.usersService.deleteUser(id)
  }
}

