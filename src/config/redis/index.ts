import session from 'express-session';
import Redis, { RedisOptions } from 'ioredis';
import connectRedis, { RedisStoreOptions } from 'connect-redis';

import { logger } from '~/utils';

const isProd = process.env.NODE_ENV === 'production';
const maxAge = Number(process.env.SESSION_EXPIRES_IN) * 1000;

const redisStore = connectRedis(session);

const redisClientOptions: RedisOptions = {
	host: String(process.env.REDIS_HOST) || '127.0.0.1',
	port: Number(process.env.REDIS_PORT) || 6379,
};

const redis = new Redis(redisClientOptions);

const redisOptions: RedisStoreOptions = {
	client: redis,
};

const redisSessionMiddleware = session({
	store: new redisStore(redisOptions),
	secret: String(process.env.SESSION_SECRET),
	resave: true,
	rolling: false,
	saveUninitialized: false,
	proxy: true,
	cookie: {
		path: '/',
		domain: 'localhost',
		maxAge,
		httpOnly: true,
		sameSite: true,
		secure: isProd,
	},
});

redis.on('ready', () => {
	logger.redis(
		`Redis connection is open to: ${redisClientOptions.host}:${redisClientOptions.port}`
	);
});

redis.on('error', err => {
	logger.redis('Redis connection has occured error: %O', err);
});

export { redisSessionMiddleware };
