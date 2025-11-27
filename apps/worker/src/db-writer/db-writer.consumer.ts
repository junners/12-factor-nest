import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('db-writer', { concurrency: 50 })
export class DbWriter extends WorkerHost {
  public async process(job: Job) {
    await job.updateProgress(1);
    // add a writer here using the default pg driver
    await job.updateProgress(100);
  }
}
