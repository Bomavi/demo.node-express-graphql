import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { registerEnumTypes } from 'src/utils/enum';
import { authChecker } from 'src/middleware/authChecker';

import { LoginResolver } from './auth/mutations/LoginResolver';
import { LogoutResolver } from './auth/mutations/LogoutResolver';
import { RegisterResolver } from './auth/mutations/RegisterResolver';
import { AuthenticateResolver } from './auth/queries/AuthenticateResolver';
import { CreateTaskResolver } from './task/mutations/CreateTaskResolver';
import { DeleteTaskResolver } from './task/mutations/DeleteTaskResolver';
import { UpdateTaskResolver } from './task/mutations/UpdateTaskResolver';
import { FindTaskByIDResolver } from './task/queries/FindTaskByIDResolver';
import { SearchTasksResolver } from './task/queries/SearchTasksResolver';
import { CreateUserResolver } from './user/mutations/CreateUserResolver';
import { DeleteUserResolver } from './user/mutations/DeleteUserResolver';
import { UpdateUserResolver } from './user/mutations/UpdateUserResolver';
import { CurrentUserResolver } from './user/queries/CurrentUserResolver';
import { FindUserByIDResolver } from './user/queries/FindUserByIDResolver';
import { SearchUsersResolver } from './user/queries/SearchUsersResolver';

export const generateSchema = async (): Promise<GraphQLSchema> => {
	try {
		registerEnumTypes();

		const schema = await buildSchema({
			resolvers: [
				LoginResolver,
				LogoutResolver,
				RegisterResolver,
				AuthenticateResolver,
				CreateTaskResolver,
				DeleteTaskResolver,
				UpdateTaskResolver,
				FindTaskByIDResolver,
				SearchTasksResolver,
				CreateUserResolver,
				DeleteUserResolver,
				UpdateUserResolver,
				CurrentUserResolver,
				FindUserByIDResolver,
				SearchUsersResolver,
			],
			authChecker,
		});

		return schema;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
