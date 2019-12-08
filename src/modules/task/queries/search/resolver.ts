import { Resolver, Authorized, Query, Ctx, Args } from 'type-graphql';

import { Task } from '~/models/Task';

import { SearchTasksArgs } from './args';

@Resolver()
export class SearchTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async searchTasks(
		@Args() { q }: SearchTasksArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task[]> {
		const { userId } = ctx.req.session!;

		const tasks = await Task.find({
			where: {
				description: new RegExp(q.toLowerCase(), 'i'),
				createdBy: userId!,
			},
			order: {
				createdAt: 'ASC',
			},
		});

		return tasks;
	}
}
