import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file


// Create a new ratelimiter, that allows 10 requests per 1 minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), // Uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from environment variables
    limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 requests per 1 minute
    analytics: true, // Optional: Enable analytics for monitoring
});

export default ratelimit;