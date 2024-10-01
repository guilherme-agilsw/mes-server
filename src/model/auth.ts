export interface JwtPayload {
    uid: string;
}

export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}

export interface UpdateStatus {  
    success: boolean;  
    message: string;
}

export class LoginUserDTO {  
    email:    string;
    password: string;
}

export interface LoginStatus {
    email: string;
    accessToken: any;
    expiresIn: any;
}