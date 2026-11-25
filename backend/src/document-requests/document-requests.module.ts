
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentRequestsController } from './document-requests.controller.js';
import { DocumentRequestsService } from './document-requests.service.js';
import { DocumentRequest } from './document-request.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentRequest]),
    AuthModule,
  ],
  controllers: [DocumentRequestsController],
  providers: [DocumentRequestsService],
})
export class DocumentRequestsModule {}
