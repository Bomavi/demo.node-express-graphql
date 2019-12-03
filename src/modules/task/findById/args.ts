import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FindTaskByIDArgs {
	@Field(() => ID)
	id!: string;
}
