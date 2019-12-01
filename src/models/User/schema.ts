/* npm imports */
import { Schema, Document, Model, DocumentQuery } from 'mongoose';

export interface UserDocument extends Document {
	username: string;
	password: string;
	theme: Theme;
}

export const schema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		theme: {
			type: String,
			default: 'light',
		},
	},
	{
		timestamps: true,
	}
);

type SearchQuery = DocumentQuery<any, UserDocument>;
type GetPublicQuery = DocumentQuery<any, Omit<UserDocument, 'password' | 'role' | '__v'>>;

export interface UserQueries {
	search: (this: SearchQuery, value: string) => SearchQuery;
	getPublic: (this: GetPublicQuery) => GetPublicQuery;
}

const userQueries: UserQueries = {
	search(this, value) {
		const val = value.toLowerCase();
		return this.where({
			username: new RegExp(val, 'i'),
		});
	},
	getPublic(this) {
		return this.select('-password -role -__v');
	},
};

export type UserModel = Model<UserDocument, UserQueries> & UserQueries;

schema.query = userQueries;

// schema.query.search = function(value: string): SearchQuery {
// 	const val = value.toLowerCase();
// 	return this.where({
// 		username: new RegExp(val, 'i'),
// 	});
// };

// schema.query.getPublic = function(): GetPublicQuery {
// 	return this.select('-password -role -__v');
// };
