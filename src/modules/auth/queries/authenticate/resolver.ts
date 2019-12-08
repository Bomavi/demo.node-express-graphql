import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { jwt } from '~/utils';
import { User } from '~/models/User';

const manager = getMongoManager();

@Resolver()
export class AuthenticateResolver {
	@Authorized()
	@Query(() => User)
	async authenticate(@Ctx() ctx: ApolloContext): Promise<User> {
		const { accessToken } = ctx.req.session!;

		const { userId } = await jwt.validate(accessToken!);
		const user = await manager.findOneOrFail(User, userId);

		return user;
	}
}
