import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string, userFromDb: any) {
    if (!userFromDb) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, userFromDb.password);

    if (!isMatch) throw new UnauthorizedException();

    return userFromDb;
  }
}