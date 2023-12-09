import { Resolver, Mutation, Authorized, Args, ArgsType, Field } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { User } from 'src/models/User';
import { Theme } from 'src/utils/enum';


@ArgsType()
export class CreateUserArgs {
	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;

	@Field(() => String)
	theme!: Theme;
}


@Resolver()
export class CreateUserResolver {
	@Authorized()
	@Mutation(() => User)
	async createUser(@Args() { username, password, theme }: CreateUserArgs): Promise<User> {
		const user = await getRepository(User).create({username, password, theme});
		const result = await getRepository(User).save(user);

		return result;
	}
}
