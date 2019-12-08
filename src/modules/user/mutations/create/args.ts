import { ArgsType, Field } from 'type-graphql';

import { Theme } from '~/models/User';

@ArgsType()
export class CreateUserArgs {
	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;

	@Field(() => String)
	theme!: Theme;
}
