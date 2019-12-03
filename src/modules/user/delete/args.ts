import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class DeleteUserArgs {
	@Field(() => ID)
	id!: string;
}
