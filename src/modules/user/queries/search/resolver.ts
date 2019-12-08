import { Resolver, Query, Authorized, Args } from 'type-graphql';

import { User } from '~/models/User';

import { SearchUsersArgs } from './args';

@Resolver()
export class SearchUsersResolver {
	@Authorized()
	@Query(() => [User])
	async searchUsers(@Args() { q }: SearchUsersArgs): Promise<User[]> {
		const users = await User.find({
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
