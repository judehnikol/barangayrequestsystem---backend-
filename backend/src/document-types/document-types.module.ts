
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentTypesController } from './document-types.controller.js';
import { DocumentTypesService } from './document-types.service.js';
import { DocumentType } from './document-type.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentType]),
    AuthModule,
  ],
  controllers: [DocumentTypesController],
  providers: [DocumentTypesService],
})
export class DocumentTypesModule {}
