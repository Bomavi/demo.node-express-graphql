/* npm imports: common */
import debugLogger from 'debug';

const debug = (msg, format = '') => {
	debugLogger('debug')(msg, format);
};

const app = (msg, format = '') => {
	debugLogger('app')(msg, format);
};

const api = (msg, format = '') => {
	debugLogger('api')(msg, format);
};

const http = (msg, format = '') => {
	debugLogger('http')(msg, format);
};

const mongo = (msg, format = '') => {
	debugLogger('mongo')(msg, format);
};

const redis = (msg, format = '') => {
	debugLogger('redis')(msg, format);
};

const error = (msg, format = '') => {
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
