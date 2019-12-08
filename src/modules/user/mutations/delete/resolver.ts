import { Resolver, Mutation, Authorized, Args, Int } from 'type-graphql';

import { User } from '~/models/User';

import { DeleteUserArgs } from './args';

@Resolver()
export class DeleteUserResolver {
	@Authorized()
	@Mutation(() => Int)
	async deleteUser(@Args() { id }: DeleteUserArgs): Promise<number> {
		const user = await User.findOneOrFail(id);

		await User.delete(user.id);

		return id;
	}
}
