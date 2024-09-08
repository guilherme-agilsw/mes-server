import * as bcrypt from 'bcrypt';

export const toPromise = <T>(data: T): Promise<T> => {  
    return new Promise<T>(resolve => { resolve(data);  });
};

export const comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};
