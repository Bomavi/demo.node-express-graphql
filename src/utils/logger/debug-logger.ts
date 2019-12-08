/* eslint-disable @typescript-eslint/no-explicit-any */
import debugLogger from 'debug';

const debug = (msg: string, format: any = ''): void => {
	debugLogger('debug')(msg, format);
};

const app = (msg: string, format: any = ''): void => {
	debugLogger('app')(msg, format);
};

const api = (msg: string, format: any = ''): void => {
	debugLogger('api')(msg, format);
};

const http = (msg: string, format: any = ''): void => {
	debugLogger('http')(msg, format);
};

const mongo = (msg: string, format: any = ''): void => {
	debugLogger('mongo')(msg, format);
};

const redis = (msg: string, format: any = ''): void => {
	debugLogger('redis')(msg, format);
};

const error = (msg: string, format: any = ''): void => {
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
