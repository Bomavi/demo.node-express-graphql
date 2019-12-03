import { Resolver, Mutation, Authorized, Ctx, Args, ID } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { Task } from '~/models/Task';

import { DeleteTaskArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class DeleteTaskResolver {
	@Authorized()
	@Mutation(() => ID)
	async deleteTask(
		@Args() { id }: DeleteTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<string> {
		const { userId } = ctx.req.session!;

		const task = await manager.findOneOrFail(Task, {
			where: {
				id,
				createdBy: userId!,
			},
		});

		await manager.delete(Task, task.id);

		return id;
	}
}
