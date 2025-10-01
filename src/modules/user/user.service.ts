import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (!user) throw new NotFoundException(`Usuario #${id} não encontrado`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
