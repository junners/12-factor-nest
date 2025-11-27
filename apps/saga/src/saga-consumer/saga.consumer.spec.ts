import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { Mock, vi } from 'vitest';

import { SagaConsumer } from './saga.consumer';

describe('SagaConsumer', () => {
  let provider: SagaConsumer;
  let jobArg: Job;
  let updateProgress: Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SagaConsumer],
    }).compile();

    provider = module.get<SagaConsumer>(SagaConsumer);
    updateProgress = vi.fn();
    jobArg = {
      updateProgress,
    } as unknown as Job;
  });

  describe('process', () => {
    it('should call dependent job progress', async () => {
      await provider.process(jobArg);
      expect(updateProgress).toHaveBeenCalledWith(1);
      expect(updateProgress).toHaveBeenCalledWith(100);
    });
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
