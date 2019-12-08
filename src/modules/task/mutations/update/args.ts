import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UpdateTaskArgs {
	@Field(() => Int)
	id!: number;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => Boolean, { defaultValue: false })
	completed!: boolean;
}
