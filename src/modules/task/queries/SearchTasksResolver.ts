import { Resolver, Authorized, Query, Ctx, Args, ArgsType, Field } from 'type-graphql';
import { Like } from 'typeorm';

import { getRepository } from 'src/config/typeorm';
import { SortDirection } from 'src/utils/enum';
import { Task } from 'src/models/Task';


@ArgsType()
export class SearchTasksArgs {
	@Field(() => String, { defaultValue: '' })
	q!: string;

	@Field(() => SortDirection, { defaultValue: 'ASC' })
	sortBy!: SortDirection;
}

@Resolver()
export class SearchTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async searchTasks(
		@Args() { q, sortBy }: SearchTasksArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task[]> {
		const { userId } = ctx.req.session!;

		const tasks = await getRepository(Task).find({
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
