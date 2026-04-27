import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(user: any): Promise<{
        access_token: string;
    }>;
    validateUser(email: string, password: string, userFromDb: any): Promise<any>;
}
