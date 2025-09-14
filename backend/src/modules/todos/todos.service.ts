import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.todo.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  create(userId: string, data: { title: string; description?: string }) {
    return this.prisma.todo.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Partial<{ title: string; description: string; done: boolean }>) {
    const todo = await this.prisma.todo.findFirst({ where: { id, userId } });
    if (!todo) throw new NotFoundException('Todo not found');
    return this.prisma.todo.update({ where: { id }, data });
  }

  async remove(userId: string, id: string) {
    const todo = await this.prisma.todo.findFirst({ where: { id, userId } });
    if (!todo) throw new NotFoundException('Todo not found');
    await this.prisma.todo.delete({ where: { id } });
    return { success: true };
  }
}
