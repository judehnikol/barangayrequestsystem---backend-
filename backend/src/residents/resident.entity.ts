
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('residents')
export class Resident {
  @PrimaryGeneratedColumn()
  residentID: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 15 })
  contactNumber: string;

  @Column({ length: 255 })
  email: string;
}
