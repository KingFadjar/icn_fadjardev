import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../jwt.guard';
import { IsString, MinLength } from 'class-validator';

class SuggestDto {
  @IsString() @MinLength(2) prompt!: string;
}

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('suggest')
  async suggest(@Req() req: any, @Body() dto: SuggestDto) {
    const suggestions = await this.ai.suggest(dto.prompt);
    return { suggestions };
  }
}
