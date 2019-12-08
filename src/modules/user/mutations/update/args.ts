import { ArgsType, Field, Int } from 'type-graphql';

import { Theme } from '~/models/User';

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
