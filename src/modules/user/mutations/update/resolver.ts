import { Resolver, Mutation, Authorized, Args } from 'type-graphql';

import { User } from '~/models/User';

import { UpdateUserArgs } from './args';

@Resolver()
export class UpdateUserResolver {
	@Authorized()
	@Mutation(() => User)
	async updateUser(
		@Args() { id, username, password, theme }: UpdateUserArgs
	): Promise<User> {
		const user = await User.findOneOrFail(id);

		if (username) user.username = username;
		if (password) user.password = password;
		if (theme) user.theme = theme;

		const updatedUser = await User.save(user);

		return updatedUser;
	}
}
