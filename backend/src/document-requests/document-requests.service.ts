
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentRequest } from './document-request.entity.js';

@Injectable()
export class DocumentRequestsService {
  constructor(
    @InjectRepository(DocumentRequest)
    private requestsRepository: Repository<DocumentRequest>,
  ) {}

  async create(data: Partial<DocumentRequest>) {
    const request = this.requestsRepository.create({
      ...data,
      RequestDate: data.RequestDate ?? new Date(),
    });

    return await this.requestsRepository.save(request);
  }

  async findAll() {
    return await this.requestsRepository.find({
      relations: {
        Resident: true,
        DocumentType: true,
        Staff: true,
      },
    });
  }

  async findOne(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { RequestID: id },
      relations: {
        Resident: true,
        DocumentType: true,
        Staff: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Document request not found');
    }

    return request;
  }

  async update(id: number, data: Partial<DocumentRequest>) {
    const request = await this.findOne(id);
    Object.assign(request, data);
    return await this.requestsRepository.save(request);
  }

  async remove(id: number) {
    const request = await this.findOne(id);
    await this.requestsRepository.remove(request);

    return { message: 'Document request deleted successfully' };
  }
}
