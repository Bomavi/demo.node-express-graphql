import 'module-alias/register';
import 'reflect-metadata';

import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';

import { logger } from 'src/utils';
import { service } from 'src/config/service';
import { initPostgresConnection } from 'src/config/typeorm';
import { redisSessionMiddleware } from 'src/config/redis';
import { generateSchema } from 'src/modules';

dotenv.config();
service.init();

(async (): Promise<void> => {
	const PORT = Number(process.env.PORT || process.env.DEV_PORT);

	try {
		await initPostgresConnection();

		const schema = await generateSchema();

		const apolloServer = new ApolloServer({
			schema,
			context: ({ req, res }): ApolloContext => ({ req, res }),
		});

		const app = express();

		const httpServer = createServer(app);

		app.set('trust proxy', true);

		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

		app.use(redisSessionMiddleware as any);

		await apolloServer.start();
		apolloServer.applyMiddleware({ app });

		httpServer.listen(PORT, () => {
			logger.app(`Server is running on port ${PORT}`);
		});
	} catch (e) {
		console.error(e);
	}
})();
