import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { authChecker } from '~/middleware';

export const generateSchema = async (): Promise<GraphQLSchema> => {
	try {
		const schema = await buildSchema({
			resolvers: [__dirname + '/**/resolver.ts'],
			authChecker,
		});

		return schema;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
