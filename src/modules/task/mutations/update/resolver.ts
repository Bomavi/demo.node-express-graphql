import { Resolver, Mutation, Authorized, Ctx, Args } from 'type-graphql';

import { Task } from '~/models/Task';

import { UpdateTaskArgs } from './args';

@Resolver()
export class UpdateTaskResolver {
	@Authorized()
	@Mutation(() => Task)
	async updateTask(
		@Args() { id, description, completed }: UpdateTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task> {
		const { userId } = ctx.req.session!;

		const task = await Task.findOneOrFail({
			where: {
				id,
				createdBy: userId!,
			},
		});

		if (description) task.description = description;
		if (typeof completed === 'boolean') task.completed = completed;

		const updatedTask = await Task.save(task);

		return updatedTask;
	}
}
