import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO, UserListDTO } from 'src/model/user';
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

    @Post('updateUser')
    @UseGuards(AuthGuard())
    public async updateUser( @Body('id') id: number, @Body() user: UserDTO): Promise<UserDTO> {
        return await this.usersService.updateUser(id, user);
    }

    @Get('getUsersByPerfil/:perfil')    
    @UseGuards(AuthGuard())
    public async getUsersByPerfil(@Param('perfil') perfil: string): Promise<UserListDTO> {
        return await this.usersService.getUsersByPerfil(perfil);
    }

    @Get('countStatus')
    @UseGuards(AuthGuard())
    async getUserCountByStatus() {
        return this.usersService.countUsersByStatus();
    }
}
