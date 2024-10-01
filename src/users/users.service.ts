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

    async createUser(userDTO: UserCreateDTO): Promise<UserDTO>{    

        const { name, email, password, perfil, ativo } = userDTO;

        const userInDB = await this.usersRepository.findOne({ 
            where: { email } 
        });
        if (userInDB) {
            throw new HttpException('Usuário com este email já existe na base do sistema.', HttpStatus.BAD_REQUEST);
        }

        let user: UserEntity = new UserEntity();
        user.name = name;
        user.uid = uuid.v4();
        user.email = email;
        user.password = password;
        user.perfil = perfil;
        user.ativo = ativo;

        user = await this.usersRepository.save(user);

        // console.log(user);

        return toPromise(toUserDTO(user));
    }

    async updateUser(id: number, userDTO: UserDTO): Promise<UserDTO>{    
        
        const user  = await this.usersRepository.findOne({ where: { id } });

        if (!user ) {
            throw new HttpException('Usuário não localizado', HttpStatus.NOT_FOUND);
        }

        user.uid = userDTO.uid;
        user.name = userDTO.name;
        user.email = userDTO.email;
        user.perfil = userDTO.perfil;
        user.ativo = userDTO.ativo;
        await this.usersRepository.save(user);

        return toPromise(toUserDTO(user));
    }

    async getAllUsers(): Promise<UserListDTO> {
        const list: UserListDTO = new UserListDTO();        
        const result: UserEntity[] = await this.usersRepository
            .createQueryBuilder("users")
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
            throw new HttpException('Usuário não localizado', HttpStatus.UNAUTHORIZED);
        }
        
        // compare passwords    
        const areEqual = await comparePasswords(user.password, password);
        
        if (!areEqual) {
            throw new HttpException('Credenciais Inválidas', HttpStatus.UNAUTHORIZED);
        }
        
        return toUserDTO(user);
    }

    async findOne(options?: object): Promise<UserEntity> {
        const user =  await this.usersRepository.findOne(options);
        return user;
    }

    async findByPayload({ uid }: any): Promise<UserDTO> {
        return toUserDTO(await this.findOne({ 
            where:  { uid } })) 
    }

    async findById({ id }: any): Promise<UserDTO> {
        const user = await this.findOne({ where: { id } });
        if (!user) {
            return null;
        }
        return toUserDTO(user);
    }
}
