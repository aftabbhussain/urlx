import { Queue } from "bullmq";
import IORedis from 'ioredis';

const redisConnection = new IORedis('redis://localhost:6379', {
    maxRetriesPerRequest : null
});

export const analyticsQueue = new Queue('analytics-queue', {
    connection: redisConnection
});

console.log('Analytics Queue initiated');