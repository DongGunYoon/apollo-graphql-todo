import {
  Ctx,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql"
import Todo from "../../entity/Todo"
import { TodoModel } from "../../models/todo"
import Auth from "../../middleware/auth"

@Resolver()
export default class TodoQueryResolver {
    @UseMiddleware(Auth())
    @Query(() => [Todo])
  async getTodos(
    @Ctx() context: any,) {
    if (!context.user) throw new Error("Unauthorized")
    return TodoModel.find({ name: context.user.userId })
  }
}