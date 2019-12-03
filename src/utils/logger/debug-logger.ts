import debugLogger from 'debug';

const debug = (msg: string, format = ''): void => {
	debugLogger('debug')(msg, format);
};

const app = (msg: string, format = ''): void => {
	debugLogger('app')(msg, format);
};

const api = (msg: string, format = ''): void => {
	debugLogger('api')(msg, format);
};

const http = (msg: string, format = ''): void => {
	debugLogger('http')(msg, format);
};

const mongo = (msg: string, format = ''): void => {
	debugLogger('mongo')(msg, format);
};

const redis = (msg: string, format = ''): void => {
	debugLogger('redis')(msg, format);
};

const error = (msg: string, format = ''): void => {
	debugLogger('error')(msg, format);
};

export const logger = {
	debug,
	app,
	api,
	http,
	mongo,
	redis,
	error,
};
