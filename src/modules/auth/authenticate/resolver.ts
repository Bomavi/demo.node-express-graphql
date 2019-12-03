import { Resolver, Mutation, Ctx } from 'type-graphql';
import { getMongoManager } from 'typeorm';
import createError from 'http-errors';

import { jwt } from '~/utils';
import { User } from '~/models/User';

const manager = getMongoManager();

@Resolver()
export class RegisterResolver {
	@Mutation(() => User)
	async register(@Ctx() ctx: ApolloContext): Promise<User> {
		const { accessToken } = ctx.req.session!;

		if (!accessToken) throw createError(401, 'user not authenticated');

		const { userId } = await jwt.validate(accessToken);
		const user = await manager.findOneOrFail(User, userId);

		return user;
	}
}
