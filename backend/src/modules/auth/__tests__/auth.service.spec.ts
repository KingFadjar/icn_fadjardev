import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../../prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  it('should be defined', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();
    const service = moduleRef.get(AuthService);
    expect(service).toBeDefined();
  });
});
