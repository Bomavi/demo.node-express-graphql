import { Resolver, Query, Authorized, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { User } from '~/models/User';

import { SearchUsersArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class SearchUsersResolver {
	@Authorized()
	@Query(() => [User])
	async searchUsers(@Args() { q }: SearchUsersArgs): Promise<User[]> {
		const users = await manager.find(User, {
			where: {
				username: new RegExp(q.toLowerCase(), 'i'),
			},
			order: {
				createdAt: 'ASC',
			},
		});

		return users;
	}
}
