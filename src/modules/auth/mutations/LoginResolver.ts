import { Resolver, Mutation, Args, Ctx, ArgsType, Field } from 'type-graphql';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';

import { jwt, logger } from 'src/utils';
import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';

const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;

@ArgsType()
export class LoginArgs {
	@Field(() => String, { defaultValue: '' })
	username!: string;

	@Field(() => String, { defaultValue: '' })
	password!: string;

	@Field(() => Boolean, { defaultValue: false })
	isGuest!: boolean;
}

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(
		@Args() { username, password, isGuest }: LoginArgs,
		@Ctx() ctx: ApolloContext
	): Promise<User> {
		let user;

		const credentials = {
			username: isGuest ? process.env.GUEST_USERNAME : username,
			password: isGuest ? process.env.GUEST_PASSWORD : password,
		};

		if (!credentials.username) throw createError(404, `username is required`);
		if (!credentials.password) throw createError(404, `password is required`);

		const foundUser = await getRepository(User).findOneBy({
			username: credentials.username,
		});

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

			const userBody = new User();

			userBody.username = credentials.username;
			userBody.password = hash;

			const newUser = await getRepository(User).save(userBody);

			if (newUser) user = newUser;
		}

		if (!user) throw createError(401, `user not found or credentials invalid`);

		const token = await jwt.issue({ userId: user.id });

		ctx.req.session!.accessToken = token;
		ctx.req.session!.userId = user.id;

		logger.debug('User body is %O', user);

		return user;
	}
}
