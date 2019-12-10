import { Resolver, Authorized, Query, Ctx, Args } from 'type-graphql';
import { Like } from 'typeorm';

import { Task } from '~/models/Task';

import { SearchTasksArgs } from './args';

@Resolver()
export class SearchTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async searchTasks(
		@Args() { q, sortBy }: SearchTasksArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task[]> {
		const { userId } = ctx.req.session!;

		const tasks = await Task.find({
			where: {
				description: Like(`%${q}%`),
				author: userId!,
			},
			order: {
				completed: 'ASC',
				createdAt: sortBy,
			},
		});

		return tasks;
	}
}
