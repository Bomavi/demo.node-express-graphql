import { Resolver, Mutation, Authorized, Args, ArgsType, Field, Int } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';
import { Theme } from 'src/utils/enum';


@ArgsType()
export class UpdateUserArgs {
	@Field(() => Int)
	id!: number;

	@Field(() => String, { nullable: true })
	username?: string;

	@Field(() => String, { nullable: true })
	password?: string;

	@Field(() => Theme, { nullable: true })
	theme?: Theme;
}

@Resolver()
export class UpdateUserResolver {
	@Authorized()
	@Mutation(() => User)
	async updateUser(
		@Args() { id, username, password, theme }: UpdateUserArgs
	): Promise<User> {
		const user = await getRepository(User).findOneByOrFail({ id });

		if (username) user.username = username;
		if (password) user.password = password;
		if (theme) user.theme = theme;

		const updatedUser = await getRepository(User).save(user);

		return updatedUser;
	}
}
