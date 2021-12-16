import Auth from "../../middleware/auth"
import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware
} from "type-graphql"
import Todo from "../../entity/Todo"
import UpdateTodoInput from "./todoInput/UpdateTodoCommentInput"
import CreateTodoInput from "./todoInput/CreateTodoInput"
import TodoDao from "../../databases/todoapp/dao/TodoDao"
import { ApolloError } from "apollo-server-express"

@Resolver()
export default class TodoMutationResolver {
  @UseMiddleware(Auth())
  @Mutation(() => Todo)
  async addTodo(
    @Arg("input", () => CreateTodoInput) input: CreateTodoInput,
    @Ctx() context: any) {
    return input.name === context.user.userId ? await TodoDao.addTodo(input) : new ApolloError("Abnormal Active Detected!")
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async deleteTodo(
    @Arg("input", () => String) input: string,
    @Ctx() context: any) {
    if (!await TodoDao.validationCheckById(input, context.user.userId)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.deleteTodo(input)
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async toggleTodo(
    @Arg("input", () => String) input: string,
    @Ctx() context: any) {
    if (!await TodoDao.validationCheckById(input, context.user.userId)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.toggleTodo(input)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async updateTodo(
    @Arg("input", () => UpdateTodoInput) input: UpdateTodoInput,
    @Ctx() context: any) {
    if (!await TodoDao.validationCheckById(input._id, context.user.userId)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.updateTodo(input._id, input.newComment)
  }
}