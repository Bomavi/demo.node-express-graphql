import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class UpdateUserArgs {
	@Field(() => ID)
	id!: string;

	@Field(() => String, { nullable: true })
	username?: string;

	@Field(() => String, { nullable: true })
	password?: string;

	@Field(() => String, { nullable: true })
	theme?: Theme;
}
