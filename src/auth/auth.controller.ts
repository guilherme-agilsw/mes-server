import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDTO, UserDTO, UserListDTO } from 'src/model/user';
import { JwtPayload, LoginStatus, LoginUserDTO, RegistrationStatus, UpdateStatus } from 'src/model/auth';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService) { }


    @Post('register')
    public async register(@Body() createUserDto: UserCreateDTO): Promise<RegistrationStatus> {
        const result:
            RegistrationStatus = await this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDTO): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }

    @Get('getUser')    
    @UseGuards(AuthGuard())
    public async getUser(@Body()  id: number): Promise<UserDTO> {
        return await this.authService.getUser(id);
    }

    @Get('getAllUsers')    
    @UseGuards(AuthGuard())
    public async getAllUsersUser(): Promise<UserListDTO> {
        return await this.authService.getAllUsers();
    }
    @Post('updateUser')
    public async updateUser( @Body('id') id: number, @Body() user: UserDTO): Promise<UpdateStatus> {
        return await this.authService.updateUser(id, user);
    }

}
