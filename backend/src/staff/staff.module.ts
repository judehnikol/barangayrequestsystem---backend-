
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffController } from './staff.controller.js';
import { StaffService } from './staff.service.js';
import { Staff } from './staff.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    AuthModule,
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
