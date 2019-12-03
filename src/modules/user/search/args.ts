import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class SearchUsersArgs {
	@Field(() => String, { defaultValue: '' })
	q!: string;
}
