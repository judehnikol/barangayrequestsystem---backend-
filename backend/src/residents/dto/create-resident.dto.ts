
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateResidentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  contactNumber: string;

  @IsEmail()
  @MaxLength(255)
  email: string;
}
