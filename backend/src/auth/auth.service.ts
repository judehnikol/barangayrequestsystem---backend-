
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { Staff } from '../staff/staff.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const staff = await this.staffRepository.findOneBy({
      Username: username,
    });

    if (!staff) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(
      password,
      staff.Password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: staff.StaffID,
      username: staff.Username,
      role: staff.Role,
    };

    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
