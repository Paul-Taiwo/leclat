import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    let user: {
      id: string;
      email: string;
      name: string;
      phone?: string;
      password: string;
      role: Role;
      classId?: string;
      createdAt: Date;
      updatedAt?: Date;
    };

    const admin = await this.prisma.admin.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!admin) {
      user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    } else {
      user = admin;
    }
    return user;
  }
}
