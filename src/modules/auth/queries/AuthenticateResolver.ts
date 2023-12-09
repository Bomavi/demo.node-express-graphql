import { Resolver, Query, Ctx, Authorized } from 'type-graphql';

import { jwt } from 'src/utils';
import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';

@Resolver()
export class AuthenticateResolver {
	@Authorized()
	@Query(() => User)
	async authenticate(@Ctx() ctx: ApolloContext): Promise<User> {
		const { accessToken } = ctx.req.session!;

		const { userId } = await jwt.validate(accessToken!);
		const user = await getRepository(User).findOneByOrFail({ id: userId });

		return user;
	}
}
