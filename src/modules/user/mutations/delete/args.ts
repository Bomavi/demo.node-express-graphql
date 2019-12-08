import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class DeleteUserArgs {
	@Field(() => Int)
	id!: number;
}
