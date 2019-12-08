import { Resolver, Mutation, Authorized, Ctx, Args, Int } from 'type-graphql';

import { Task } from '~/models/Task';

import { DeleteTaskArgs } from './args';

@Resolver()
export class DeleteTaskResolver {
	@Authorized()
	@Mutation(() => Int)
	async deleteTask(
		@Args() { id }: DeleteTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<number> {
		const { userId } = ctx.req.session!;

		const task = await Task.findOneOrFail({
			where: {
				id,
				createdBy: userId as number,
			},
		});

		await Task.delete(task.id);

		return id;
	}
}
