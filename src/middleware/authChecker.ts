import { AuthChecker } from 'type-graphql';
import createError from 'http-errors';

import { jwt } from 'src/utils';

export const authChecker: AuthChecker<ApolloContext, string[]> = async (
	{ context: { req } },
	roles
) => {
	let token = '';

	if (req.session!.accessToken) {
		token = req.session!.accessToken;
	} else {
		const accessToken = req.headers['authorization'];

		if (!accessToken) throw createError(401, 'no accessToken provided!');

		if (accessToken.startsWith('Bearer ')) {
			const tokenData = accessToken.split(' ');
			token = tokenData[1];
		}
	}

	if (!token) throw createError(401, 'no accessToken provided!');

	const decodedToken = await jwt.validate(token);

	if (!decodedToken.userId) throw createError(403, 'token invalid!');

	if (roles) {
		// check for accepted roles
	}

	return true;
};
