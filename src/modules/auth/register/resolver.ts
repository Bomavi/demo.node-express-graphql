import { Resolver, Mutation, Args, Ctx } from 'type-graphql';
import { getMongoManager } from 'typeorm';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';

import { jwt } from '~/utils';
import { User } from '~/models/User';

import { RegisterArgs } from './args';

const manager = getMongoManager();
const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;

@Resolver()
export class RegisterResolver {
	@Mutation(() => User)
	async register(
		@Args() { username, password }: RegisterArgs,
		@Ctx() ctx: ApolloContext
	): Promise<User | undefined> {
		if (!username) throw createError(404, `username is required`);
		if (!password) throw createError(404, `password is required`);

		const foundUser = await manager.findOne(User, { username });

		if (foundUser) throw createError(405, `user "${username}" already exists`);

		const hash = await bcrypt.hash(password, BCRYPT_SALT);

		if (!hash) throw createError(500, 'bcrypt failed');

		const user = await manager
			.create(User, {
				username,
				password: hash,
			})
			.save();

		const token = await jwt.issue({ userId: user.id });

		ctx.req.session!.accessToken = token;
		ctx.req.session!.userId = user.id;

		return user;
	}
}
