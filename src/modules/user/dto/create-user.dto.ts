import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'yan@gmail.com', description: 'Email of the user' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '123456', description: 'Password of the user' })
  password: string;
}
