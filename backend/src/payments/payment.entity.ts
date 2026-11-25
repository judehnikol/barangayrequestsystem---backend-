
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { DocumentRequest } from '../document-requests/document-request.entity.js';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  PaymentID: number;

  @ManyToOne(() => DocumentRequest)
  @JoinColumn({
    name: 'RequestID',
    referencedColumnName: 'RequestID',
  })
  DocumentRequest: DocumentRequest;

  @Column({ type: 'datetime' })
  PaymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: string;

  @Column({ length: 30 })
  PaymentMethod: string;

  @Column({ length: 30 })
  PaymentStatus: string;
}
