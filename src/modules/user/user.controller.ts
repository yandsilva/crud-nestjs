import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorHandleDto } from 'src/common/errors/error.util';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
@ApiTags('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ErrorHandleDto> {
    try {
      return new ErrorHandleDto(
        'Usuario criado com sucesso',
        this.userService.create(createUserDto),
      );
    } catch (error) {
      if (error.message === 'Usuário já existe') {
        throw new ConflictException('Usuário já existe');
      }
      throw new InternalServerErrorException('Erro inesperado do servidor');
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
