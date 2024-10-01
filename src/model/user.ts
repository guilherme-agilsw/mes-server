import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


///// DTOs
export class UserDTO {
    id: number;
    uid: string;
    name: string;
    email: string;
    perfil: string;
    ativo: boolean;
    // password: string;

}

export class UserCreateDTO {
    // id: number;
    // uid: string;
    name: string;
    email: string;
    password: string;
    perfil: string;
    ativo: boolean;
}

export class UserListDTO {
    users: UserDTO[];
    constructor() {
        this.users = [];
    }
}


///// Entities
@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    uid: string;

    @Column()
    name: string; 
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    perfil: string;

    @Column()
    ativo: boolean;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    // @OneToMany(() => PhotoEntity, photo => photo.user, {
    //     eager: true,
    // })
    

}
