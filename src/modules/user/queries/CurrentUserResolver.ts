import { Resolver, Query, Ctx } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';

@Resolver()
export class CurrentUserResolver {
	@Query(() => User, { nullable: true })
	async currentUser(@Ctx() ctx: ApolloContext): Promise<User | null> {
		const { userId } = ctx.req.session!;

		if (!userId) return null;

		const user = await getRepository(User).findOneByOrFail({ id: userId });

		return user;
	}
}
