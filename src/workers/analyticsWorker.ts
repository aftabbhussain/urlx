import { Worker, Job } from "bullmq";
import IORedis from 'ioredis';
import { AnalyticsModel } from "../models/Analytics";
const redisConnection = new IORedis('redis://localhost:6379', {
    maxRetriesPerRequest : null
});

export const analyticsWorker = new Worker('analytics-queue', async (job : Job) => {
    await AnalyticsModel.create({
        shortId: job.data.shortId,
        ip: job.data.ip,
        userAgent: job.data.userAgent,
        timeStamp: job.data.timeStamp
    });
    console.log(`Analytics data stored for shortId : ${job.data.shortId}`);

}, {connection: redisConnection})

analyticsWorker.on('completed', (job) => {
    console.log(`Job Id : ${job.id} Completed successfully`);
});
analyticsWorker.on('failed', (job, err) => {
    console.error('Job Id ${job.id} failed', err);
});