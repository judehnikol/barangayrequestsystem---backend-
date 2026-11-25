
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdateResidentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  contactNumber?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
}

