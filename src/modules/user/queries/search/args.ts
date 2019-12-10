import { ArgsType, Field, registerEnumType } from 'type-graphql';

import { SortDirection } from '~/utils/enum';

registerEnumType(SortDirection, {
	name: 'SortDirection',
	description: 'Available sort directions',
});

@ArgsType()
export class SearchUsersArgs {
	@Field(() => String, { defaultValue: '' })
	q!: string;

	@Field(() => SortDirection, { defaultValue: 'ASC' })
	sortBy!: SortDirection;
}
