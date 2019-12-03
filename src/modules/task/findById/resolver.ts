import { Resolver, Query, Authorized, Ctx, Args } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import { Task } from '~/models/Task';

import { FindTaskByIDArgs } from './args';

const manager = getMongoManager();

@Resolver()
export class FindTaskByIDResolver {
	@Authorized()
	@Query(() => Task)
	async findTaskById(
		@Args() { id }: FindTaskByIDArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task | undefined> {
		const { userId } = ctx.req.session!;

		const task = await manager.findOne(Task, {
			where: {
				id,
				createdBy: userId!,
			},
		});

		return task;
	}
}
