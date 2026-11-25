
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateDocumentTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  DocumentName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  Fee: number;
}
