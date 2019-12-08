import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class SearchTasksArgs {
	@Field(() => String, { defaultValue: '' })
	q!: string;
}
