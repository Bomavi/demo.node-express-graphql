import { Resolver, Query, Authorized, Ctx, Args } from 'type-graphql';

import { Task } from '~/models/Task';

import { FindTaskByIDArgs } from './args';

@Resolver()
export class FindTaskByIDResolver {
	@Authorized()
	@Query(() => Task)
	async findTaskById(
		@Args() { id }: FindTaskByIDArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task | undefined> {
		const { userId } = ctx.req.session!;

		const task = await Task.findOne({
			where: {
				id,
				author: {
					id: userId as number,
				},
			},
			relations: ['author'],
		});

		return task;
	}
}
