import "reflect-metadata"
import { buildSchema } from "type-graphql"
import UserQueryResolver from "../../resolvers/User/query"
import UserMutationResolver from "../../resolvers/User/mutation"

const create = async () => {
  return await buildSchema({resolvers: [
    UserQueryResolver,
    UserMutationResolver
  ],})
}

export default create()