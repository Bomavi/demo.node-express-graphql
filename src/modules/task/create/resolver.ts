import { Resolver, Mutation, Authorized, Ctx, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { Task } from '~/models/Task';

import { CreateTaskArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class CreateTaskResolver {
	@Authorized()
	@Mutation(() => Task)
	async createTask(
		@Args() { description, completed }: CreateTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task> {
		const { userId } = ctx.req.session!;

		const newTask = new Task();

		newTask.description = description;
		newTask.completed = completed;
		newTask.createdBy = userId as string;

		const task = await manager.save(Task, newTask);

		return task;
	}
}
