
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('document_type')
export class DocumentType {
  @PrimaryGeneratedColumn()
  DocumentTypeID: number;

  @Column({ length: 100 })
  DocumentName: string;

  @Column({ length: 255 })
  Description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Fee: number;
}
