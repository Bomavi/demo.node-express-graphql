import { Resolver, Mutation, Authorized, Args, Int, ArgsType, Field } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';

@ArgsType()
export class DeleteUserArgs {
	@Field(() => Int)
	id!: number;
}

@Resolver()
export class DeleteUserResolver {
	@Authorized()
	@Mutation(() => Int)
	async deleteUser(@Args() { id }: DeleteUserArgs): Promise<number> {
		const user = await getRepository(User).findOneByOrFail({ id });

		await getRepository(User).delete(user.id);

		return id;
	}
}
