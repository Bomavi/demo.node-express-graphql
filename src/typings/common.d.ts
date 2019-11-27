import 'NodeJS';

type GlobalBase = NodeJS.Global;

declare global {
	namespace NodeJS {
		interface Global extends GlobalBase {
			SERVICE_NAME?: string;
			SERVICE_TOKEN?: string;
		}
	}
}
