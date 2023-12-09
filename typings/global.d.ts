/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
import { ObjectId } from 'typeorm';
import session from 'express-session';

// Add our custom fields to 3-rd party modules
declare global {
	var SERVICE_NAME: string;
	var SERVICE_TOKEN: string;
}

declare module 'express-session' {
  export interface SessionData {
    accessToken: string;
    userId: number;
  }
}