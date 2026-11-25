
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

import { DocumentTypesService } from './document-types.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { RolesGuard } from '../common/roles.guard.js';

import { CreateDocumentTypeDto } from './dto/create-document-type.dto.js';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('document-types')
export class DocumentTypesController {
  constructor(
    private readonly documentTypesService: DocumentTypesService,
  ) {}

  @Post()
  create(@Body() data: CreateDocumentTypeDto) {
    return this.documentTypesService.create(data);
  }

  @Get()
  findAll() {
    return this.documentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentTypesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDocumentTypeDto,
  ) {
    return this.documentTypesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentTypesService.remove(id);
  }
}
