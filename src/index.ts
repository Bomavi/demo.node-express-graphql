// import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { logger } from '~/utils';
import { service } from '~/config/service';
import { mongoConnect } from '~/config/mongo';
import { redisSessionMiddleware } from '~/config/redis';

/* Get .env constants */
dotenv.config();

/* Initialize microservice with credentials */
service.init();

(async (): Promise<void> => {
	const PORT = Number(process.env.PORT || process.env.DEV_PORT);

	await mongoConnect();

	const schema = await buildSchema({
		resolvers: [],
	});

	const apolloServer = new ApolloServer({ schema });

	const app = express();

	app.set('trust proxy', true);
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use(redisSessionMiddleware);

	apolloServer.applyMiddleware({ app });

	app.listen(PORT, () => {
		logger.app(`Server is running on port ${PORT}`);
	});
})();
