import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import {UserDTO, UserListDTO } from 'src/model/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('getAllUsers')    
    public async getAllUsersUser(): Promise<UserListDTO> {
        return await this.usersService.getAllUsers();  
    }

    @Get('getUser')    
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

}
