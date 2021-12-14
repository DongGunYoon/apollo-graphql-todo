import { ApolloError } from "apollo-server-express"
import { MiddlewareFn } from "type-graphql"

export default function Auth(): MiddlewareFn<any> {
  return async ({
    context
  }: {context:any}, next: any) => {
    if (!context.user) {
      throw new ApolloError("Unauthorized!")
    }
    return next()
  }
}