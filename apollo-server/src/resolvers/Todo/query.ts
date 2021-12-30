import {
  Ctx,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql"
import Todo from "../../entity/Todo"
import Auth from "../../middleware/auth"
import TodoDao from "../../databases/todoapp/dao/TodoDao"

@Resolver()
export default class TodoQueryResolver {
  @UseMiddleware(Auth())
  @Query(() => [Todo])
  async getTodos(
  @Ctx() context: any) {
    return await TodoDao.getTodosByName(context.user.nickname)
  }

  @UseMiddleware(Auth())
  @Query(() => [String])
  getNameAndNickname(
  @Ctx() context: any) {
    return [context.user.userId, context.user.nickname]
  }
}