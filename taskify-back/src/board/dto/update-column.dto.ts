import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateColumnDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
} 