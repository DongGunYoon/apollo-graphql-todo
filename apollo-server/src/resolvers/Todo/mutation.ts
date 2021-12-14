import Auth from "../../middleware/auth"
import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware
} from "type-graphql"
import Todo from "../../entity/Todo"
import { TodoModel } from "../../models/todo"
import CreateTodoInput from "./todoInput/CreateTodoInput"
import UpdateTodoInput from "./todoInput/UpdateTodoCommentInput"

@Resolver()
export default class TodoMutationResolver {
  @UseMiddleware(Auth())
  @Mutation(() => Todo)
  async addTodo(
    @Arg("input", () => CreateTodoInput) input: CreateTodoInput) {
    const todo = await new TodoModel(input).save()
    return todo
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async deleteTodo(
    @Ctx() context: any,
    @Arg("input", () => String) input: string) {
    if (!context.user) throw new Error("Unauthorized")
    if ((await TodoModel.deleteOne({ "_id": input })).deletedCount) return true
    else return false
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async toggleTodo(
    @Ctx() context: any,
    @Arg("input", () => String) input: string) {
    if (!context.user) throw new Error("Unauthorized")
    let type: boolean | undefined
    await TodoModel.findOne({ "_id": input }).then(data => type = data?.completed)
    if ((await TodoModel.updateOne({ "_id": input }, { "completed": !type })).matchedCount) return true
    else return false
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async updateTodo(
    @Ctx() context: any,
    @Arg("input", () => UpdateTodoInput) input: UpdateTodoInput) {
    if (!context.user) throw new Error("Unauthorized")
    if ((await TodoModel.updateOne({ "_id": input._id }, { "comment": input.newComment })).matchedCount) return true
    else return false
  }
}