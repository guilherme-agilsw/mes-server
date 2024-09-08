import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDTO } from 'src/model/auth';
import { toUserDTO } from 'src/model/mapper';
import { UserCreateDTO, UserDTO, UserEntity, UserListDTO } from 'src/model/user';
import { comparePasswords, toPromise } from 'src/model/utils';
import { Repository } from 'typeorm';

import * as uuid from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { 
    }

    async getOneUser(id: number): Promise<UserDTO> {   
        return this.getUser(id);
    }

    async getUser(id: number): Promise<UserDTO> {
        const result: UserEntity = await this.usersRepository.createQueryBuilder("users")            
            .where("users.id = :id", { id: id })
            .getOne();
        const user: UserEntity = result;
        if (!user) {
            throw new HttpException(`User item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        return toPromise(toUserDTO(user));
    }

    async createUser(userDTO: UserCreateDTO): Promise<UserDTO>{    
        // console.log(userDTO);

        const { name, email, password } = userDTO;

        const userInDB = await this.usersRepository.findOne({ 
            where: { email } 
        });
        if (userInDB) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        let user: UserEntity = new UserEntity();
        user.name = name;
        user.uid = uuid.v4();
        user.email = email;
        user.password = password;

        // MOCK
        // this.users.push(user);
        user = await this.usersRepository.save(user);

        // console.log(user);

        return toPromise(toUserDTO(user));
    }

    async updateUser(id: number, userDTO: UserCreateDTO): Promise<UserDTO>{    
        const { name, email, password } = userDTO;

        let user: UserEntity = new UserEntity();
        user.id = id;
        user.name = name;
        // user.uid = uid;
        user.email = email;
        user.password = password;

        // MOCK
        // for (let index = 0; index < users.length; index++) {
        //     const element = users[index];
        //     if (element.id === id) {
        //         users[index] = user;
        //     }
        // }
        user = await this.usersRepository.save(user);

        return toPromise(toUserDTO(user));
    }

    async getAllUsers(): Promise<UserListDTO> {
        const list: UserListDTO = new UserListDTO();
        
        // MOCK
        // const list: UserListDTO = new UserListDTO();
        // const result: UserEntity[] = await this.usersRepository.find();
        const result: UserEntity[] = await this.usersRepository
            .createQueryBuilder("users")
            .leftJoinAndSelect("users.projects", "pusr")
            .leftJoinAndSelect("pusr.project", "project")
            .getMany();

        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            list.users.push(toUserDTO(element));
        }
        return toPromise(list);
    }

    async deleteUser(id: number) {
        try{
            await this.usersRepository.delete(id);
        } catch (exception) {
            throw new HttpException(exception, HttpStatus.BAD_REQUEST);
        }
    }


    async findByLogin({ email, password }: LoginUserDTO): Promise<UserDTO> {    
        const user = await this.usersRepository.findOne({ where: { email } });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        
        // compare passwords    
        const areEqual = await comparePasswords(user.password, password);
        
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        
        return toUserDTO(user);
    }

    async findOne(options?: object): Promise<UserEntity> {
        const user =  await this.usersRepository.findOne(options);
        // return toUserDto(user);
        return user;
    }

    async findByPayload({ uid }: any): Promise<UserDTO> {
        return toUserDTO(await this.findOne({ 
            where:  { uid } })) 
    }
}
