import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateUserArgs {
	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;

	@Field(() => String)
	theme!: Theme;
}
