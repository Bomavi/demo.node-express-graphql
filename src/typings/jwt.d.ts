/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
import { ObjectID } from 'typeorm';

declare global {
	interface JWTPayload {
		userId?: number;
		service?: string;
	}
}
