
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Staff, StaffRole } from './staff.entity.js';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  // Validate staff role
  private validateRole(role: string | undefined) {
    if (
      role !== undefined &&
      !Object.values(StaffRole).includes(role as StaffRole)
    ) {
      throw new BadRequestException(
        'Invalid role. Only Admin and Staff are allowed.',
      );
    }
  }

  // Create staff with hashed password and unique username
  async create(staffData: Partial<Staff>) {
    this.validateRole(staffData.Role);

    const existingStaff = await this.staffRepository.findOneBy({
      Username: staffData.Username,
    });

    if (existingStaff) {
      throw new ConflictException('Username already exists');
    }

    const staff = this.staffRepository.create(staffData);

    if (staff.Password) {
      staff.Password = await bcrypt.hash(staff.Password, 10);
    }

    const savedStaff = await this.staffRepository.save(staff);
    return this.removePassword(savedStaff);
  }

  // Get all staff without passwords
  async findAll() {
    const staffList = await this.staffRepository.find();

    return staffList.map((staff) => this.removePassword(staff));
  }

  // Get one staff without password
  async findOne(id: number) {
    const staff = await this.staffRepository.findOneBy({
      StaffID: id,
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    return this.removePassword(staff);
  }

  // Update staff and hash password if changed
  async update(id: number, staffData: Partial<Staff>) {
    this.validateRole(staffData.Role);

    const staff = await this.staffRepository.findOneBy({
      StaffID: id,
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    // Check if the new username is already used by another staff
    if (staffData.Username && staffData.Username !== staff.Username) {
      const existingStaff = await this.staffRepository.findOneBy({
        Username: staffData.Username,
      });

      if (existingStaff) {
        throw new ConflictException('Username already exists');
      }
    }

    Object.assign(staff, staffData);

    if (staffData.Password) {
      staff.Password = await bcrypt.hash(staffData.Password, 10);
    }

    const updatedStaff = await this.staffRepository.save(staff);
    return this.removePassword(updatedStaff);
  }

  // Delete staff
  async remove(id: number) {
    const staff = await this.staffRepository.findOneBy({
      StaffID: id,
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    await this.staffRepository.remove(staff);

    return { message: 'Staff deleted successfully' };
  }

  // Hide password from API response
  private removePassword(staff: Staff) {
    const { Password, ...safeStaff } = staff;
    return safeStaff;
  }
}
