
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MaxLength,
} from 'class-validator';

import { StaffRole } from '../staff.entity.js';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  LastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  Username: string;

  @IsString()
  @IsNotEmpty()
  Password: string;

  @IsOptional()
  @IsEnum(StaffRole)
  Role?: StaffRole;
}
