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
import TodoService from "@/services/todo/TodoService"

@Resolver()
export default class TodoMutationResolver {
  @UseMiddleware(Auth())
  @Mutation(() => Todo)
  async addTodo(
    @Arg("input", () => CreateTodoInput) input: CreateTodoInput,
    @Ctx() context: any) {
    return await TodoService.addTodo(input, context.user.nickname)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async deleteTodo(
    @Arg("input", () => String) input: string,
    @Ctx() context: any) {
    return await TodoService.deleteTodo(input, context.user.nickname)
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async toggleTodo(
    @Arg("input", () => String) input: string,
    @Ctx() context: any) {
    return await TodoService.toggleTodo(input, context.user.nickname)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async updateTodo(
    @Arg("input", () => UpdateTodoInput) input: UpdateTodoInput,
    @Ctx() context: any) {
    return await TodoService.updateTodo(input._id, context.user.nickname, input.newComment)
  }
}