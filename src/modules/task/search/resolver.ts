import { Resolver, Authorized, Query, Ctx, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { Task } from '~/models/Task';

import { SearchTasksArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class SearchTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async searchTasks(
		@Args() { q }: SearchTasksArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task[]> {
		const { userId } = ctx.req.session!;

		const tasks = await manager.find(Task, {
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
