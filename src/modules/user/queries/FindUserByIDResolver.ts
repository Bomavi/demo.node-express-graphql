import { Resolver, Query, Authorized, Args, ArgsType, Field, Int } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';

@ArgsType()
export class FindUserByIDArgs {
	@Field(() => Int)
	id!: number;
}

@Resolver()
export class FindUserByIDResolver {
	@Authorized()
	@Query(() => User)
	async findUserById(@Args() { id }: FindUserByIDArgs): Promise<User | null> {
		const user = await getRepository(User).findOneBy({id});

		return user;
	}
}
