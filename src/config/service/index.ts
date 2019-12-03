import { jwt, logger } from '~/utils';

const init = async (): Promise<void> => {
	const serviceName = process.env.SERVICE_NAME || 'service';
	const token = (await jwt.issue({ service: serviceName }, false)) as string;

	global.SERVICE_NAME = serviceName;
	global.SERVICE_TOKEN = token;

	logger.app('SERVICE_NAME: %o', global.SERVICE_NAME);
	logger.app('SERVICE_TOKEN: %o', global.SERVICE_TOKEN);
};

export const service = { init };
