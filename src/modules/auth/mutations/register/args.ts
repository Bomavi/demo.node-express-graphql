import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RegisterArgs {
	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;
}
