import { Controller, Get, UseGuards } from '@nestjs/common';
import {UserListDTO } from 'src/model/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('getAllUsers')    
    public async getAllUsersUser(): Promise<UserListDTO> {
        return await this.usersService.getAllUsers();  
    }

}
