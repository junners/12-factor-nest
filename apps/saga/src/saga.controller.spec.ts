import { Test, TestingModule } from '@nestjs/testing';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

describe('SagaController', () => {
  let sagaController: SagaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SagaController],
      providers: [SagaService],
    }).compile();

    sagaController = app.get<SagaController>(SagaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sagaController.getHello()).toBe('Hello World!');
    });
  });
});
