import { Resolver, Mutation, Authorized, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { User } from '~/models/User';

import { CreateUserArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class CreateUserResolver {
	@Authorized()
	@Mutation(() => User)
	async createUser(@Args() { username, password, theme }: CreateUserArgs): Promise<User> {
		const user = await manager
			.create(User, {
				username,
				password,
				theme,
			})
			.save();

		return user;
	}
}
