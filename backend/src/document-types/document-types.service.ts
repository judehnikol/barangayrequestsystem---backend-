
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from './document-type.entity.js';

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypesRepository: Repository<DocumentType>,
  ) {}

  async create(data: Partial<DocumentType>) {
    const documentType = this.documentTypesRepository.create(data);
    return await this.documentTypesRepository.save(documentType);
  }

  async findAll() {
    return await this.documentTypesRepository.find();
  }

  async findOne(id: number) {
    const documentType = await this.documentTypesRepository.findOneBy({
      DocumentTypeID: id,
    });

    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }

    return documentType;
  }

  async update(id: number, data: Partial<DocumentType>) {
    const documentType = await this.findOne(id);
    Object.assign(documentType, data);
    return await this.documentTypesRepository.save(documentType);
  }

  async remove(id: number) {
    const documentType = await this.findOne(id);
    await this.documentTypesRepository.remove(documentType);

    return { message: 'Document type deleted successfully' };
  }
}
