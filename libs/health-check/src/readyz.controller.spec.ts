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

  describe('readyz', () => {
    it('should return ok', () => {
      expect(controller.readyz()).toStrictEqual({ message: 'ok' });
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
