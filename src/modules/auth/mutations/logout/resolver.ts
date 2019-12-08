import { Resolver, Mutation, Authorized, Ctx } from 'type-graphql';

@Resolver()
export class RegisterResolver {
	@Authorized()
	@Mutation(() => String)
	logout(@Ctx() ctx: ApolloContext): Promise<string> {
		return new Promise((resolve, reject) =>
			ctx.req.session!.destroy(err => {
				if (err) return reject('something went wrong and user was not logged out...');

				ctx.res.clearCookie('connect.sid');
				return resolve('user was logged out successfuly');
			})
		);
	}
}
