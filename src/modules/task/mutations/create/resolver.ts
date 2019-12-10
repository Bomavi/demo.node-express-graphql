import { Resolver, Mutation, Authorized, Ctx, Args } from 'type-graphql';

import { Task } from '~/models/Task';

import { CreateTaskArgs } from './args';

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
		newTask.author = userId as number;

		const task = await Task.save(newTask);

		return task;
	}
}
