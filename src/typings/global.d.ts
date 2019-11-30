// Hide error for "declare global"
export {};

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
			userId?: string;
		}
	}
}
