import { Test, TestingModule } from '@nestjs/testing';
import { StartzController } from './startz.controller';

describe('StartzController', () => {
  let controller: StartzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartzController],
    }).compile();

    controller = module.get<StartzController>(StartzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
