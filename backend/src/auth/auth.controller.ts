
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(
    @Body() loginData: {
      username: string;
      password: string;
    },
  ) {
    return this.authService.login(
      loginData.username,
      loginData.password,
    );
  }
}
