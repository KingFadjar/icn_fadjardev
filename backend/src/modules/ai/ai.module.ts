import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [AiController],
  providers: [AiService, PrismaService],
})
export class AiModule {}
