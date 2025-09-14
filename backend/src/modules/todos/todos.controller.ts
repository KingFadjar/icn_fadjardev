import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../../jwt.guard';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

class CreateTodoDto {
  @IsString() @MinLength(2) title!: string;
  @IsOptional() @IsString() description?: string;
}

class UpdateTodoDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsBoolean() done?: boolean;
}

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todos: TodosService) {}

  @Get()
  list(@Req() req: any) {
    return this.todos.list(req.user.sub);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateTodoDto) {
    return this.todos.create(req.user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todos.update(req.user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.todos.remove(req.user.sub, id);
  }
}
