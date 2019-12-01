/* npm imports */
import { model } from 'mongoose';

/* local imports */
import { schema, TaskDocument, TaskModel } from './schema';

// schema.pre('save', function(next) {
// 	next();
// });

export const Task = model<TaskDocument, TaskModel>('Task', schema);
