import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {UserDTO, UserListDTO } from 'src/model/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('getAllUsers')    
    @UseGuards(AuthGuard())
    public async getAllUsersUser(): Promise<UserListDTO> {
        return await this.usersService.getAllUsers();
    }

    @Get('getUser')       
    @UseGuards(AuthGuard()) 
    public async getUser(@Query('id') id: number): Promise<UserDTO> {
        return await this.usersService.getUserById(id);
    }

    @Patch('updateUser')
    async updateUser(
      @Query('id') id: number, 
      @Body() userDTO: UserDTO
    ): Promise<UserDTO> {
      return this.usersService.updateUser(id, userDTO);
    }

    @Get('getUsersByPerfil/:perfil')    
    @UseGuards(AuthGuard())
    public async getUsersByPerfil(@Param('perfil') perfil: string): Promise<UserListDTO> {
        return await this.usersService.getUsersByPerfil(perfil);
    }

    @Get('countStatus')
    async getUserCountByStatus() {
        return this.usersService.countUsersByStatus();
    }
}
