import { Request, Response } from 'express';

declare global {
	interface ApolloContext {
		req: Request;
		res: Response;
	}
}
