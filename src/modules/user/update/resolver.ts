import { Resolver, Mutation, Authorized, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { User } from '~/models/User';

import { UpdateUserArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class UpdateUserResolver {
	@Authorized()
	@Mutation(() => User)
	async updateUser(
		@Args() { id, username, password, theme }: UpdateUserArgs
	): Promise<User> {
		const user = await manager.findOneOrFail(User, id);

		if (username) user.username = username;
		if (password) user.password = password;
		if (theme) user.theme = theme;

		const updatedUser = await manager.save(User, user);

		return updatedUser;
	}
}
