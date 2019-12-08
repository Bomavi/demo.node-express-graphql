import { createConnection, Connection } from 'typeorm';

const postgresConnect = async (): Promise<Partial<Connection>> => {
	const isProd = process.env.NODE_ENV === 'production';

	const DB_HOST = process.env.POSTGRES_DB_HOST || process.env.POSTGRES_DB_DEV_HOST;

	const DB_PORT = Number(
		process.env.POSTGRES_DB_PORT || process.env.POSTGRES_DB_DEV_PORT
	);

	const DB_NAME = process.env.POSTGRES_DB_NAME || process.env.DB_DEV_NAME;

	const DB_USERNAME = process.env.POSTGRES_USERNAME || process.env.DB_DEV_USERNAME;
	const DB_PASSWORD = process.env.POSTGRES_PASSWORD || process.env.DB_DEV_PASSWORD;

	return await createConnection({
		type: 'postgres',
		host: DB_HOST,
		port: DB_PORT,
		database: DB_NAME,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		synchronize: true,
		logging: !isProd,
		entities: [__dirname + '/../../models/*.*'],
	});
};

export { postgresConnect };
