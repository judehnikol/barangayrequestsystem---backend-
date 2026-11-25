
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MaxLength,
} from 'class-validator';

import { StaffRole } from '../staff.entity.js';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  FirstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  LastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  Username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Password?: string;

  @IsOptional()
  @IsEnum(StaffRole)
  Role?: StaffRole;
}
