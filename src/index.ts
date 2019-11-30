/* npm imports */
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import 'module-alias/register';

/* root imports */
import { logger } from '~/utils';
import { api } from '~/routes';
import { service, mongoConnect, redis } from '~/config';

/* Get .env constants */
dotenv.config();

/* Initialize microservice with credentials */
service.init();

const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || process.env.DEV_PORT;
const maxAge = Number(process.env.SESSION_EXPIRES_IN) * 1000;
const app: Application = express();

/* Initialize middlewares and express-session with REDIS */
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	redis.session({
		store: new redis.redisStore(redis.redisOptions),
		secret: process.env.SESSION_SECRET,
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
	})
);

/* Initialize MONGO configuration */
mongoConnect();

/* Initialize app routes */
app.use(`/services/${process.env.SERVICE_NAME}`, api());

/* Start app */
app.listen(PORT, () => {
	logger.app(`Server is running on port ${PORT}`);
});
