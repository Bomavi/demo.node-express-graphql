import { Resolver, Query, Authorized, Args, ArgsType, Field, registerEnumType } from 'type-graphql';
import { Like } from 'typeorm';

import { getRepository } from 'src/config/typeorm';
import { SortDirection } from 'src/utils/enum';
import { User } from 'src/models/User';

registerEnumType(SortDirection, {
	name: 'SortDirection',
	description: 'Available sort directions',
});

@ArgsType()
export class SearchUsersArgs {
	@Field(() => String, { defaultValue: '' })
	q!: string;

	@Field(() => SortDirection, { defaultValue: 'ASC' })
	sortBy!: SortDirection;
}

@Resolver()
export class SearchUsersResolver {
	@Authorized()
	@Query(() => [User])
	async searchUsers(@Args() { q, sortBy }: SearchUsersArgs): Promise<User[]> {
		const users = await getRepository(User).find({
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
