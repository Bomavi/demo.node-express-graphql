/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
import { ObjectID } from 'typeorm';

// Add our custom fields to 3-rd party modules
declare global {
	namespace NodeJS {
		interface Global {
			SERVICE_NAME?: string;
			SERVICE_TOKEN?: string;
		}
	}

	namespace Express {
		interface Session {
			accessToken?: string;
			userId?: ObjectID | string;
		}
	}
}
