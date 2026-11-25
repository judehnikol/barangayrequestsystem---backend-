
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Resident } from '../residents/resident.entity.js';
import { Staff } from '../staff/staff.entity.js';
import { DocumentType } from '../document-types/document-type.entity.js';

@Entity('document_request')
export class DocumentRequest {
  @PrimaryGeneratedColumn()
  RequestID: number;

  @ManyToOne(() => Resident)
  @JoinColumn({
    name: 'ResidentID',
    referencedColumnName: 'residentID',
  })
  Resident: Resident;

  @ManyToOne(() => DocumentType)
  @JoinColumn({
    name: 'DocumentTypeID',
    referencedColumnName: 'DocumentTypeID',
  })
  DocumentType: DocumentType;

  @ManyToOne(() => Staff)
  @JoinColumn({
    name: 'StaffID',
    referencedColumnName: 'StaffID',
  })
  Staff: Staff;

  @Column({ type: 'datetime' })
  RequestDate: Date;

  @Column({ length: 255 })
  Purpose: string;

  @Column({ length: 255 })
  Status: string;
}
