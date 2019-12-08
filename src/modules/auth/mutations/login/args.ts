import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginArgs {
	@Field(() => String, { defaultValue: '' })
	username!: string;

	@Field(() => String, { defaultValue: '' })
	password!: string;

	@Field(() => Boolean, { defaultValue: false })
	isGuest!: boolean;
}
