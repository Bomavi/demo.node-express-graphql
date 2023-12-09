import { Resolver, Mutation, Authorized, Ctx, Args,  ArgsType, Field } from 'type-graphql';

import { getRepository } from 'src/config/typeorm';
import { Task } from 'src/models/Task';

@ArgsType()
export class CreateTaskArgs {
	@Field(() => String)
	description!: string;

	@Field(() => Boolean, { defaultValue: false })
	completed!: boolean;
}

@Resolver()
export class CreateTaskResolver {
	@Authorized()
	@Mutation(() => Task)
	async createTask(
		@Args() { description, completed }: CreateTaskArgs,
		@Ctx() ctx: ApolloContext
	): Promise<Task> {
		const { userId } = ctx.req.session!;

		const task = await getRepository(Task).create({
			description,
			completed,
			author: userId as number
		});

		const result = await getRepository(Task).save(task);

		return result;
	}
}
