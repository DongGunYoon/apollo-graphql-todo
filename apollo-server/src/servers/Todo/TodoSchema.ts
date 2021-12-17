import "reflect-metadata"
import { buildSchema } from "type-graphql"
import TodoQueryResolver from "@/resolvers/Todo/query"
import TodoMutationResolver from "@/resolvers/Todo/mutation"

const create = async () => {
  return await buildSchema({resolvers: [
    TodoQueryResolver,
    TodoMutationResolver
  ],})
}

export default create()