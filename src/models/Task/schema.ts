/* npm imports */
import { Types, Schema, Document, Model, Query } from 'mongoose';

const { ObjectId } = Schema.Types;

export interface TaskDocument extends Document {
	description: string;
	completed: boolean;
	createdBy: Types.ObjectId;
}

export const schema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			required: true,
		},
		createdBy: {
			type: ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

type SearchQuery = (value: string) => Query<TaskDocument[]>;
type CreatedByQuery = (userId: string) => Query<TaskDocument[]>;
type GetPublicQuery = () => Query<Omit<TaskDocument, 'createdBy' | '__v'>>;

export interface TaskQueries {
	search: SearchQuery;
	createdBy: CreatedByQuery;
	getPublic: GetPublicQuery;
}

export type TaskModel = Model<TaskDocument, TaskQueries>;

schema.query.search = function(value: string): SearchQuery {
	const val = value.toLowerCase();
	return this.where({ description: new RegExp(val, 'i') });
};

schema.query.createdBy = function(userId: string): CreatedByQuery {
	return this.where({
		createdBy: userId,
	});
};

schema.query.getPublic = function(): GetPublicQuery {
	return this.select('-createdBy -__v');
};
