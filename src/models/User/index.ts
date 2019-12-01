/* npm imports */
import { model } from 'mongoose';

/* local imports */
import { schema, UserDocument, UserModel } from './schema';

// schema.pre('save', function(next) {
// 	next();
// });

export const User = model<UserDocument, UserModel>('User', schema);
