
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  IsObject,
  ValidateNested,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class ResidentReferenceDto {
  @IsInt()
  @Min(1)
  residentID: number;
}

class DocumentTypeReferenceDto {
  @IsInt()
  @Min(1)
  DocumentTypeID: number;
}

class StaffReferenceDto {
  @IsInt()
  @Min(1)
  StaffID: number;
}

export class CreateDocumentRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => ResidentReferenceDto)
  Resident: ResidentReferenceDto;

  @IsObject()
  @ValidateNested()
  @Type(() => DocumentTypeReferenceDto)
  DocumentType: DocumentTypeReferenceDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StaffReferenceDto)
  Staff?: StaffReferenceDto;

  @IsOptional()
  @IsDateString()
  RequestDate?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Purpose: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Status: string;
}
