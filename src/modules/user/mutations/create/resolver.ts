import { Resolver, Mutation, Authorized, Args } from 'type-graphql';

import { User } from '~/models/User';

import { CreateUserArgs } from './args';

@Resolver()
export class CreateUserResolver {
	@Authorized()
	@Mutation(() => User)
	async createUser(@Args() { username, password, theme }: CreateUserArgs): Promise<User> {
		const user = new User();

		user.username = username;
		user.password = password;
		user.theme = theme;

		const createdUser = await User.save(user);

		return createdUser;
	}
}
