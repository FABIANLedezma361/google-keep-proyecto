import { AuthService, LoginDto, RegisterDto } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    register(registerDto: RegisterDto): Promise<import("./auth.service").AuthResponse>;
}
