import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FindUserByIDArgs {
	@Field(() => Int)
	id!: number;
}
