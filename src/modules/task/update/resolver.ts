import { Resolver, Mutation, Authorized, Ctx, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { Task } from '~/models/Task';

import { UpdateTaskArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class UpdateTaskResolver {
	@Authorized()
	@Mutation(() => Task)
	async updateTask(
		@Args() { id, description, completed }: UpdateTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task> {
		const { userId } = ctx.req.session!;

		const task = await manager.findOneOrFail(Task, {
			where: {
				id,
				createdBy: userId!,
			},
		});

		task.description = description;
		task.completed = completed;

		const updatedTask = await manager.save(Task, task);

		return updatedTask;
	}
}
