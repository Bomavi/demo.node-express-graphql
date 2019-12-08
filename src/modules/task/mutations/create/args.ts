import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateTaskArgs {
	@Field(() => String)
	description!: string;

	@Field(() => Boolean, { defaultValue: false })
	completed!: boolean;
}
