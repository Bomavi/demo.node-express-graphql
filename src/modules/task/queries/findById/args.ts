import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FindTaskByIDArgs {
	@Field(() => Int)
	id!: number;
}
