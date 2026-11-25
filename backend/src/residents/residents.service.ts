
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resident } from './resident.entity.js';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private residentsRepository: Repository<Resident>,
  ) {}

  async create(residentData: Partial<Resident>) {
    const resident = this.residentsRepository.create(residentData);
    return await this.residentsRepository.save(resident);
  }

  async findAll() {
    return await this.residentsRepository.find();
  }

  async findOne(id: number) {
    const resident = await this.residentsRepository.findOneBy({
      residentID: id,
    });

    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    return resident;
  }

  async update(id: number, residentData: Partial<Resident>) {
    const resident = await this.findOne(id);
    Object.assign(resident, residentData);
    return await this.residentsRepository.save(resident);
  }

  async remove(id: number) {
    const resident = await this.findOne(id);
    await this.residentsRepository.remove(resident);

    return { message: 'Resident deleted successfully' };
  }
}
