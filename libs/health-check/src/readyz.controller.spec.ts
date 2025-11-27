import { Test, TestingModule } from '@nestjs/testing';
import { ReadyzController } from './readyz.controller';

describe('ReadyzController', () => {
  let controller: ReadyzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadyzController],
    }).compile();

    controller = module.get<ReadyzController>(ReadyzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
