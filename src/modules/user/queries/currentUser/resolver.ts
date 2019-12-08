import { Resolver, Query, Ctx } from 'type-graphql';

import { User } from '~/models/User';

@Resolver()
export class CurrentUserResolver {
	@Query(() => User, { nullable: true })
	async currentUser(@Ctx() ctx: ApolloContext): Promise<User | null> {
		const { userId } = ctx.req.session!;

		if (!userId) return null;

		const user = await User.findOneOrFail(userId);

		return user;
	}
}
