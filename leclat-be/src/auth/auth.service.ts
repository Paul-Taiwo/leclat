import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Admin, User } from '@prisma/client';
import { verify } from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async comparePassword(user: User | Admin, dto: AuthDto) {
    // compare password
    const pwMatches = await verify(user.password, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

  async signIn(dto: AuthDto) {
    /* Checking if the email exists in the admin table. */
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: dto.email,
      },
    });

    /* Checking if the email exists in the admin table. If it does not exist, it will check if the
    email exists in the user table. If it does not exist, it will throw an exception. If it does
    exist, it will compare the password. */
    if (!admin) {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      // if user does not exist throw exception
      if (!user) throw new ForbiddenException('Credentials incorrect');

      return this.comparePassword(user, dto);
    } else {
      return this.comparePassword(admin, dto);
    }
  }
}
