
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentRequest } from './document-request.entity.js';
import { Resident } from '../residents/resident.entity.js';
import { DocumentType } from '../document-types/document-type.entity.js';
import { Staff } from '../staff/staff.entity.js';

import { CreateDocumentRequestDto } from './dto/create-document-request.dto.js';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto.js';

@Injectable()
export class DocumentRequestsService {
  constructor(
    @InjectRepository(DocumentRequest)
    private requestsRepository: Repository<DocumentRequest>,
  ) {}

  async create(data: CreateDocumentRequestDto) {
    const request = this.requestsRepository.create({
      Resident: {
        residentID: data.Resident.residentID,
      } as Resident,

      DocumentType: {
        DocumentTypeID: data.DocumentType.DocumentTypeID,
      } as DocumentType,

      ...(data.Staff
        ? {
            Staff: {
              StaffID: data.Staff.StaffID,
            } as Staff,
          }
        : {}),

      RequestDate: data.RequestDate
        ? new Date(data.RequestDate)
        : new Date(),

      Purpose: data.Purpose,
      Status: data.Status,
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

  async update(id: number, data: UpdateDocumentRequestDto) {
    const request = await this.findOne(id);

    const updateData: Partial<DocumentRequest> = {
      ...(data.Resident
        ? {
            Resident: {
              residentID: data.Resident.residentID,
            } as Resident,
          }
        : {}),

      ...(data.DocumentType
        ? {
            DocumentType: {
              DocumentTypeID: data.DocumentType.DocumentTypeID,
            } as DocumentType,
          }
        : {}),

      ...(data.Staff
        ? {
            Staff: {
              StaffID: data.Staff.StaffID,
            } as Staff,
          }
        : {}),

      ...(data.RequestDate
        ? { RequestDate: new Date(data.RequestDate) }
        : {}),

      ...(data.Purpose !== undefined
        ? { Purpose: data.Purpose }
        : {}),

      ...(data.Status !== undefined
        ? { Status: data.Status }
        : {}),
    };

    Object.assign(request, updateData);

    return await this.requestsRepository.save(request);
  }

  async remove(id: number) {
    const request = await this.findOne(id);
    await this.requestsRepository.remove(request);

    return { message: 'Document request deleted successfully' };
  }
}
