import { Resolver, Query, Authorized, Args } from 'type-graphql';

import { User } from '~/models/User';

import { FindUserByIDArgs } from './args';

@Resolver()
export class FindUserByIDResolver {
	@Authorized()
	@Query(() => User)
	async findUserById(@Args() { id }: FindUserByIDArgs): Promise<User | undefined> {
		const user = await User.findOne(id);

		return user;
	}
}
