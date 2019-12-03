import { Resolver, Mutation, Args, Ctx } from 'type-graphql';
import { getMongoManager } from 'typeorm';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';

import { jwt } from '~/utils';
import { User } from '~/models/User';

import { LoginArgs } from './args';

const manager = getMongoManager();
const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(
		@Args() { username, password, isGuest }: LoginArgs,
		@Ctx() ctx: ApolloContext
	): Promise<User | undefined> {
		let user;

		const credentials = {
			username: isGuest ? process.env.GUEST_USERNAME : username,
			password: isGuest ? process.env.GUEST_PASSWORD : password,
		};

		if (!credentials.username) throw createError(404, `username is required`);
		if (!credentials.password) throw createError(404, `password is required`);

		const foundUser = await manager.findOne(User, { username: credentials.username });

		if (foundUser) {
			const isPasswordEqual = await bcrypt.compare(
				credentials.password,
				foundUser.password
			);

			if (!isPasswordEqual) {
				throw createError(401, `credentials for "${credentials.username}" invalid`);
			}
		}

		if (foundUser) user = foundUser;

		if (!foundUser && credentials.username === 'guest') {
			const hash = await bcrypt.hash(credentials.password, BCRYPT_SALT);

			if (!hash) throw createError(500, 'bcrypt failed');

			const newUser = await manager
				.create(User, {
					username: credentials.username,
					password: hash,
				})
				.save();

			if (newUser) user = newUser;
		}

		if (!user) throw createError(401, `user not found or credentials invalid`);

		const token = await jwt.issue({ userId: user.id });

		ctx.req.session!.accessToken = token;
		ctx.req.session!.userId = user.id;

		return user;
	}
}
