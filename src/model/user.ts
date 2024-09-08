import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


///// DTOs
export class UserDTO {
    id: number;
    uid: string;
    name: string;
    email: string;
    // password: string;

}

export class UserCreateDTO {
    // id: number;
    // uid: string;
    name: string;
    email: string;
    password: string;
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

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    // @OneToMany(() => PhotoEntity, photo => photo.user, {
    //     eager: true,
    // })
    

}
