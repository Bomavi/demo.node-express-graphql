import { Resolver, Query, Authorized, Ctx, Args, ArgsType, Field, Int } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { Task } from 'src/models/Task';

@ArgsType()
export class FindTaskByIDArgs {
	@Field(() => Int)
	id!: number;
}

@Resolver()
export class FindTaskByIDResolver {
	@Authorized()
	@Query(() => Task)
	async findTaskById(
		@Args() { id }: FindTaskByIDArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task | null> {
		const { userId } = ctx.req.session!;

		const task = await getRepository(Task).findOne({
			where: {
				id,
				author: userId as number,
			},
			relations: ['author'],
		});

		return task;
	}
}
