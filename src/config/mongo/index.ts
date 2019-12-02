/* npm imports */
import { createConnection, Connection } from 'typeorm';

const mongoConnect = async (): Promise<Partial<Connection>> => {
	const isProd = process.env.NODE_ENV === 'production';
	const MONGO_DB_HOST = process.env.MONGO_DB_HOST || process.env.MONGO_DB_DEV_HOST;
	const MONGO_DB_PORT = Number(
		process.env.MONGO_DB_PORT || process.env.MONGO_DB_DEV_PORT
	);
	const DB_NAME = process.env.DB_NAME || process.env.DB_DEV_NAME;

	return await createConnection({
		type: 'mongodb',
		host: MONGO_DB_HOST,
		port: MONGO_DB_PORT,
		database: DB_NAME,
		logging: !isProd,
	});
};

export { mongoConnect };
