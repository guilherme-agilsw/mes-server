import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { DEFAULT_EXPIRESIN } from './auth.module';
import { JwtPayload, LoginStatus, LoginUserDTO, RegistrationStatus } from 'src/model/auth';
import { UserCreateDTO, UserDTO } from 'src/model/user';


@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}


    async register(userDto: UserCreateDTO): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };
        try {
            await this.usersService.createUser(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDTO): Promise<LoginStatus> {
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        
        return {
            username: user.uid, ...token,
        };  
    }
    
    private _createToken({ uid }: UserDTO): any {
        const user: JwtPayload = { uid };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN ? process.env.EXPIRESIN : DEFAULT_EXPIRESIN,
            accessToken,
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDTO> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }    
        return user;  
    }
    
}
