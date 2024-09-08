import { UserDTO, UserEntity } from "./user";

export const toUserDTO = (data: UserEntity): UserDTO => {  
    const { id, uid, name, email} = data;
    let objDto: UserDTO = { id, uid, name, email };
    
    return objDto;
};



