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

	const connection = await createConnection({
		name: 'default',
		type: 'postgres',
		host: DB_HOST,
		port: DB_PORT,
		database: DB_NAME,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		synchronize: true, // TODO // SHOULD TO BE FALSE
		logging: !isProd ? ['error', 'warn'] : false,
		entities: [__dirname + '/../../models/*.*'],
		poolErrorHandler: () => {
			setTimeout(async () => {
				console.warn('POSTGRES: reconnecting...');
				await connection.close();
				await connection.connect();
				console.warn('POSTGRES: reconnected!');
			}, 5000);
		},
	});

	return connection;
};

export { postgresConnect };
