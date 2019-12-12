import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { registerEnumTypes } from '~/utils/enum';
import { authChecker } from '~/middleware';

export const generateSchema = async (): Promise<GraphQLSchema> => {
	try {
		registerEnumTypes();

		const schema = await buildSchema({
			resolvers: [__dirname + '/**/resolver.*'],
			authChecker,
		});

		return schema;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
