import { Resolver, Query, Authorized, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { User } from '~/models/User';

import { FindUserByIDArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class FindUserByIDResolver {
	@Authorized()
	@Query(() => User)
	async findUserById(@Args() { id }: FindUserByIDArgs): Promise<User | undefined> {
		const user = await manager.findOne(User, id);

		return user;
	}
}
