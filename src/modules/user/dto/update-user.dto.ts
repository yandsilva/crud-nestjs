import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: '123456',
    description: 'Nova senha do usuário (opcional)',
    minLength: 6,
    type: String,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;
}
