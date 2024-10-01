import { UserDTO, UserEntity } from "./user";

export const toUserDTO = (data: UserEntity): UserDTO => {  
    const { id, uid, name, email, perfil, ativo} = data;
    let objDto: UserDTO = { id, uid, name, email, perfil, ativo };
    
    return objDto;
};



