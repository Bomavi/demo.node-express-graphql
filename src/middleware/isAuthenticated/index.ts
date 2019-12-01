/* npm imports */
import { RequestHandler } from 'express';
import createError from 'http-errors';

/* root imports */
import { jwt } from '~/utils';

const isAuthenticated: RequestHandler = async (req, _res, next) => {
	let token = '';

	if (req.session!.accessToken) {
		token = req.session!.accessToken;
	} else {
		const accessToken = req.headers['authorization'];

		if (!accessToken) return next(createError(401, 'no accessToken provided!'));

		if (accessToken.startsWith('service_')) return next();

		if (accessToken.startsWith('Bearer ')) {
			const tokenData = accessToken.split(' ');
			token = tokenData[1];
		}
	}

	if (!token) return next(createError(401, 'no accessToken provided!'));

	try {
		const decodedToken = await jwt.validate(token);

		if (!decodedToken.userId) return next(createError(403, 'token invalid!'));

		next();
	} catch (e) {
		next(e);
	}
};

export { isAuthenticated };
