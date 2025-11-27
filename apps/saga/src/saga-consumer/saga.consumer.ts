import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('saga', { concurrency: 10 })
export class SagaConsumer extends WorkerHost {
  public async process(job: Job) {
    await job.updateProgress(1);
    // do something in the middle
    await job.updateProgress(100);
  }
}
