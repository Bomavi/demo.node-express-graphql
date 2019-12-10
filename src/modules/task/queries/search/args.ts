import { ArgsType, Field } from 'type-graphql';

import { SortDirection } from '~/utils/enum';

@ArgsType()
export class SearchTasksArgs {
	@Field(() => String, { defaultValue: '' })
	q!: string;

	@Field(() => SortDirection, { defaultValue: 'ASC' })
	sortBy!: SortDirection;
}
