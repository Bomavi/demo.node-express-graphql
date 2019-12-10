import { registerEnumType } from 'type-graphql';

export enum Theme {
	light = 'light',
	dark = 'dark',
}

export enum SortDirection {
	asc = 'ASC',
	desc = 'DESC',
}

export const registerEnumTypes = (): void => {
	registerEnumType(Theme, {
		name: 'Theme',
		description: 'Only available theme options',
	});

	registerEnumType(SortDirection, {
		name: 'SortDirection',
		description: 'Available sort directions',
	});
};
