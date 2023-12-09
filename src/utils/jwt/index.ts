import JWT, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const defaultExpiration = Number(process.env.SESSION_EXPIRES_IN);
const secret = String(process.env.JWT_SECRET);

const issue = (payload: JWTPayload, isExpires = true): Promise<string> =>
	new Promise((resolve, reject) => {
		const options: SignOptions = {};

		if (!payload) {
			reject('JWT: payload required parameter');
		}

		if (isExpires) options.expiresIn = defaultExpiration;

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) reject(err);
			resolve(token!);
		});
	});

const validate = (token: string): Promise<JWTPayload> =>
	new Promise((resolve, reject) => {
		if (!token) reject('{ token } required as parameter for token validation');

		JWT.verify(token, secret, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded as JWTPayload);
		});
	});

export const jwt = {
	issue,
	validate,
};
