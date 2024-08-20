import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  searchText: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  size?: number = 10;
}
