import { IsString, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;
} 