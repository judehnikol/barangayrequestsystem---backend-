
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

import { ResidentsService } from './residents.service.js';
import { Resident } from './resident.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { RolesGuard } from '../common/roles.guard.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Staff')
@Controller('residents')
export class ResidentsController {
  constructor(
    private readonly residentsService: ResidentsService,
  ) {}

  @Post()
  create(@Body() residentData: Partial<Resident>) {
    return this.residentsService.create(residentData);
  }

  @Get()
  findAll() {
    return this.residentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.residentsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() residentData: Partial<Resident>,
  ) {
    return this.residentsService.update(id, residentData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.residentsService.remove(id);
  }
}
