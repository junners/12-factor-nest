import { Test, TestingModule } from '@nestjs/testing';
import { LivezController } from './livez.controller';

describe('LivezController', () => {
  let controller: LivezController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivezController],
    }).compile();

    controller = module.get<LivezController>(LivezController);
  });

  describe('livez', () => {
    it('should return ok', () => {
      expect(controller.livez()).toStrictEqual({ message: 'ok' });
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
