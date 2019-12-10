import { Resolver, Query, Authorized, Args } from 'type-graphql';
import { Like } from 'typeorm';

import { User } from '~/models/User';

import { SearchUsersArgs } from './args';

@Resolver()
export class SearchUsersResolver {
	@Authorized()
	@Query(() => [User])
	async searchUsers(@Args() { q, sortBy }: SearchUsersArgs): Promise<User[]> {
		const users = await User.find({
			where: {
				username: Like(`%${q}%`),
			},
			order: {
				createdAt: sortBy,
			},
		});

		return users;
	}
}
