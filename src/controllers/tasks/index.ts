/* npm imports */
import express, { RequestHandler, Router } from 'express';
import mongoose from 'mongoose';

/* root imports */
import { Task } from '~/models/Task';

const { ObjectId } = mongoose.Types;

const searchOrGetAll: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req.session!;
		const { q = '' } = req.query;
		const tasks = await Task.find()
			.search(q)
			.createdBy(userId!)
			.sort('-createdAt')
			.getPublic();
		res.status(200).send(tasks);
	} catch (e) {
		next(e);
	}
};

const getById: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req.session!;
		const { _id } = req.params;
		const task = await Task.findById(_id)
			.createdBy(userId!)
			.getPublic();
		res.status(200).send(task);
	} catch (e) {
		next(e);
	}
};

const create: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req.session!;
		const { description, completed } = req.body;
		const newTask = new Task({
			_id: ObjectId(),
			description,
			completed,
			createdBy: userId,
		});
		newTask.save(async err => {
			if (err) throw Error(err);
			const task = await Task.findById(newTask._id).getPublic();
			res.status(200).send(task);
		});
	} catch (e) {
		next(e);
	}
};

const updateById: RequestHandler = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const { description, completed } = req.body;
		const task = await Task.findByIdAndUpdate(
			_id,
			{ description, completed },
			{ new: true }
		).getPublic();
		res.status(200).send(task);
	} catch (e) {
		next(e);
	}
};

const deleteById: RequestHandler = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const task = await Task.findByIdAndDelete(_id);
		if (task) res.status(200).send(task._id);
	} catch (e) {
		next(e);
	}
};

export const TasksController = (): Router => {
	const router = express();

	router.get('/', searchOrGetAll);
	router.get('/search', searchOrGetAll);
	router.get('/:_id', getById);

	router.post('/', create);

	router.put('/:_id', updateById);
	router.delete('/:_id', deleteById);

	return router;
};
