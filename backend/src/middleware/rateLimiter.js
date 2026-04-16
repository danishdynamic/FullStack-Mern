import ratelimit from "../config/upstash.js"; // Import the configured rate limiter from the upstash.js file or use import {Ratelimit} from '@upstash/ratelimit'; and import {Redis} from '@upstash/redis'; if you want to configure it directly here instead of using a separate file. But using a separate file is cleaner and more modular.

const rateLimiter = async (req, res, next) => {
    try {
        const key = req.ip; // Use the client's IP address as the key for rate limiting. This way, each client will have their own rate limit based on their IP address. Alternatively, if you have user authentication implemented, you could use a user ID instead of the IP address to limit based on user rather than IP.   
        const {success} = await ratelimit.limit(key); 
        // Use the IP address as the key for rate limiting as we r using my key string but we can also use req.ip to get the client's IP address and use it as the key for rate limiting. This way, each client will have their own rate limit based on their IP address.
        // we can use userid if we have authentication implemented and want to limit based on user instead of IP address. For now, we will use a static key for simplicity. (my-limit-key) but in production, we should use a more dynamic key like req.ip or user ID to ensure fair usage across different clients.
        if (!success) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        next();

    } catch (error) {

        console.error('Error occurred while checking rate limit:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
};


export default rateLimiter