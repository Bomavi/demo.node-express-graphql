import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class DeleteTaskArgs {
	@Field(() => ID)
	id!: string;
}
