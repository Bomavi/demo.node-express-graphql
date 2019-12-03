import { Resolver, Mutation, Authorized, Args, ID } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { User } from '~/models/User';

import { DeleteUserArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class DeleteUserResolver {
	@Authorized()
	@Mutation(() => ID)
	async deleteUser(@Args() { id }: DeleteUserArgs): Promise<string> {
		const user = await manager.findOneOrFail(User, id);

		await manager.delete(User, user.id);

		return id;
	}
}
