import { Resolver, Mutation, Authorized, Ctx, Args, Int, ArgsType, Field } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { Task } from 'src/models/Task';

@ArgsType()
export class DeleteTaskArgs {
	@Field(() => Int)
	id!: number;
}

@Resolver()
export class DeleteTaskResolver {
	@Authorized()
	@Mutation(() => Int)
	async deleteTask(
		@Args() { id }: DeleteTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<number> {
		const { userId } = ctx.req.session!;

		const task = await getRepository(Task).findOneOrFail({
			where: {
				id,
				author: userId as number,
			},
			relations: ['author'],
		});

		await getRepository(Task).delete(task.id);

		return id;
	}
}
