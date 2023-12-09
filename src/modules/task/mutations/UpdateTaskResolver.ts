import { Resolver, Mutation, Authorized, Ctx, Args, ArgsType, Field, Int } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { Task } from 'src/models/Task';

@ArgsType()
export class UpdateTaskArgs {
	@Field(() => Int)
	id!: number;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => Boolean, { defaultValue: false })
	completed!: boolean;
}

@Resolver()
export class UpdateTaskResolver {
	@Authorized()
	@Mutation(() => Task)
	async updateTask(
		@Args() { id, description, completed }: UpdateTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task> {
		const { userId } = ctx.req.session!;

		const task = await getRepository(Task).findOneOrFail({
			where: {
				id,
				author: userId as number,
			},
			relations: ['author'],
		});

		if (description) task.description = description;
		if (typeof completed === 'boolean') task.completed = completed;

		const updatedTask = await getRepository(Task).save(task);

		return updatedTask;
	}
}
