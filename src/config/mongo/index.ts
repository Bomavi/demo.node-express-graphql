import { createConnection, Connection } from 'typeorm';

const mongoConnect = async (): Promise<Partial<Connection>> => {
	const isProd = process.env.NODE_ENV === 'production';
	const MONGO_DB_HOST = process.env.MONGO_DB_HOST || process.env.MONGO_DB_DEV_HOST;
	const MONGO_DB_PORT = Number(
		process.env.MONGO_DB_PORT || process.env.MONGO_DB_DEV_PORT
	);
	const DB_NAME = process.env.DB_NAME || process.env.DB_DEV_NAME;
	const url = `${MONGO_DB_HOST}:${MONGO_DB_PORT}/${DB_NAME}`;

	return await createConnection({
		type: 'mongodb',
		url,
		logging: !isProd,
		entities: [__dirname + '/../../models/*.*'],
	});
};

export { mongoConnect };
