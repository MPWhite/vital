import { Test, TestingModule } from '@nestjs/testing';
import { BouldersService } from './boulders.service';

describe('BouldersService', () => {
  let service: BouldersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BouldersService],
    }).compile();

    service = module.get<BouldersService>(BouldersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
