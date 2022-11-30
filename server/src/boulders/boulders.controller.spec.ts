import { Test, TestingModule } from '@nestjs/testing';
import { BouldersController } from './boulders.controller';

describe('BouldersController', () => {
  let controller: BouldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BouldersController],
    }).compile();

    controller = module.get<BouldersController>(BouldersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
