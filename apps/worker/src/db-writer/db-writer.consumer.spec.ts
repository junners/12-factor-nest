import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { Mock, vi } from 'vitest';

import { DbWriter } from './db-writer.consumer';

describe('DbWriter', () => {
  let provider: DbWriter;
  let jobArg: Job;
  let updateProgress: Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbWriter],
    }).compile();

    provider = module.get<DbWriter>(DbWriter);
    updateProgress = vi.fn();
    jobArg = {
      updateProgress,
    } as unknown as Job;
  });

  describe('process', () => {
    it('should report initial and final progress', async () => {
      await provider.process(jobArg);

      expect(updateProgress).toHaveBeenNthCalledWith(1, 1);
      expect(updateProgress).toHaveBeenNthCalledWith(2, 100);
      expect(updateProgress).toHaveBeenCalledTimes(2);
    });
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
