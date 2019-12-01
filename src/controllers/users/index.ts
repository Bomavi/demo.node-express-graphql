/* npm imports */
import express, { RequestHandler, Router } from 'express';

/* root imports */
import { User } from '~/models/User';

const searchOrGetAll: RequestHandler = async (req, res, next) => {
	try {
		const { q = '' } = req.query;
		const users = await User.find()
			.search(q)
			.getPublic();
		res.status(200).send(users);
	} catch (e) {
		next(e);
	}
};

const getById: RequestHandler = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const user = await User.findById(_id).getPublic();
		res.status(200).send(user);
	} catch (e) {
		next(e);
	}
};

const updateById: RequestHandler = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const { firstname, lastname, theme } = req.body;
		const user = await User.findByIdAndUpdate(
			_id,
			{ firstname, lastname, theme },
			{ new: true }
		).getPublic();
		res.status(200).send(user);
	} catch (e) {
		next(e);
	}
};

const deleteById: RequestHandler = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const user = await User.findByIdAndDelete(_id);
		if (user) res.status(200).send(user._id);
	} catch (e) {
		next(e);
	}
};

export const UsersController = (): Router => {
	const router = express();

	router.get('/', searchOrGetAll);
	router.get('/search', searchOrGetAll);
	router.get('/:_id', getById);

	router.put('/:_id', updateById);
	router.delete('/:_id', deleteById);

	return router;
};
