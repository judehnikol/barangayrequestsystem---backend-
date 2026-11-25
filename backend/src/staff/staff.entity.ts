
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum StaffRole {
  ADMIN = 'Admin',
  STAFF = 'Staff',
}

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  StaffID: number;

  @Column({ length: 50 })
  FirstName: string;

  @Column({ length: 50 })
  LastName: string;

  @Column({ length: 50, unique: true })
  Username: string;

  @Column({ length: 255 })
  Password: string;

  @Column({
    type: 'enum',
    enum: StaffRole,
    default: StaffRole.STAFF,
  })
  Role: StaffRole;
}
