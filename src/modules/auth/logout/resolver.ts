import { Resolver, Mutation, Authorized, Ctx } from 'type-graphql';

@Resolver()
export class RegisterResolver {
	@Authorized()
	@Mutation(() => String)
	logout(@Ctx() ctx: ApolloContext): string | void {
		ctx.req.session!.destroy(err => {
			if (err) throw new Error(err);

			return 'user was logged out successfuly';
		});
	}
}
