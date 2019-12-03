import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FindUserByIDArgs {
	@Field(() => ID)
	id!: string;
}
