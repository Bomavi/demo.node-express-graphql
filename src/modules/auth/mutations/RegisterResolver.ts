import { Resolver, Mutation, Args, Ctx, ArgsType, Field } from 'type-graphql';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';

import { jwt } from 'src/utils';
import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';

const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;

@ArgsType()
export class RegisterArgs {
	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;
}

@Resolver()
export class RegisterResolver {
	@Mutation(() => User)
	async register(
		@Args() { username, password }: RegisterArgs,
		@Ctx() ctx: ApolloContext
	): Promise<User> {
		if (!username) throw createError(404, `username is required`);
		if (!password) throw createError(404, `password is required`);

		const foundUser = await getRepository(User).findOneBy({ username });

		if (foundUser) throw createError(405, `user "${username}" already exists`);

		const hash = await bcrypt.hash(password, BCRYPT_SALT);

		if (!hash) throw createError(500, 'bcrypt failed');

		const user = await getRepository(User)
			.create({
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
