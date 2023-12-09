import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

import { logger } from 'src/utils';

// const isProd = process.env.NODE_ENV === 'production';
const MAX_AGE = Number(process.env.SESSION_EXPIRES_IN) * 1000;
const REDIS_HOST = String(process.env.REDIS_HOST) || '127.0.0.1';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

const redisClient = createClient({
	url: REDIS_URL
});

redisClient.connect();

const redisStore = new RedisStore({
	client: redisClient,
  });

const redisSessionMiddleware = session({
	store: redisStore,
	secret: String(process.env.SESSION_SECRET),
	resave: true,
	rolling: false,
	saveUninitialized: false,
	proxy: true,
	cookie: {
		path: '/',
		domain: 'localhost',
		maxAge: MAX_AGE,
		httpOnly: true,
		sameSite: true,
		// secure: isProd,
	},
});

redisClient.on('ready', () => {
	logger.redis(
		`Redis connection is open to: ${REDIS_URL}`
	);
});

redisClient.on('error', err => {
	logger.redis('Redis connection has occured error: %O', err);
});

export { redisSessionMiddleware };
