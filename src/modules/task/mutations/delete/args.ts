import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class DeleteTaskArgs {
	@Field(() => Int)
	id!: number;
}
