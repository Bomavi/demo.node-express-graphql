/* npm imports */
import session from 'express-session';
import { createClient, ClientOpts } from 'redis';
import connectRedis from 'connect-redis';

/* root imports */
import { logger } from '~/utils';

const redisStore = connectRedis(session);

const redisClientOptions: ClientOpts = {
	host: String(process.env.REDIS_HOST) || '127.0.0.1',
	port: Number(process.env.REDIS_PORT) || 6379,
};

const redisClient = createClient(redisClientOptions);

const redisOptions = {
	client: redisClient,
};

redisClient.on('ready', () => {
	logger.redis(
		`Redis connection is open to: ${redisClientOptions.host}:${redisClientOptions.port}`
	);
});

redisClient.on('error', err => {
	logger.redis('Redis connection has occured error: %O', err);
});

export const redis = { session, redisOptions, redisStore };
