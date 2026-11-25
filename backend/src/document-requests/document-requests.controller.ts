
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { DocumentRequestsService } from './document-requests.service.js';
import { DocumentRequest } from './document-request.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { RolesGuard } from '../common/roles.guard.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Staff')
@Controller('document-requests')
export class DocumentRequestsController {
  constructor(
    private readonly documentRequestsService: DocumentRequestsService,
  ) {}

  @Post()
  create(@Body() data: Partial<DocumentRequest>) {
    return this.documentRequestsService.create(data);
  }

  @Get()
  findAll() {
    return this.documentRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentRequestsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<DocumentRequest>,
  ) {
    return this.documentRequestsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentRequestsService.remove(id);
  }
}
