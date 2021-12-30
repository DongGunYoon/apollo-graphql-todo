import "reflect-metadata"
import { buildSchema } from "type-graphql"
import FriendQueryResolver from "@/resolvers/Friend/query"
import FriendMutationResolver from "@/resolvers/Friend/mutation"

const create = async () => {
  return await buildSchema({resolvers: [
    FriendQueryResolver,
    FriendMutationResolver
  ],})
}

export default create()