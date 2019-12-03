import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class UpdateTaskArgs {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Boolean, { defaultValue: false })
	completed!: boolean;
}
