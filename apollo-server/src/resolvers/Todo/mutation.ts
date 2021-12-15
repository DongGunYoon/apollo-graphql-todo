import Auth from "../../middleware/auth"
import {
  Arg,
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
    @Arg("input", () => String) input: string) {
    if ((await TodoModel.deleteOne({ "_id": input })).deletedCount) return true
    else return false
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async toggleTodo(
    @Arg("input", () => String) input: string) {
    let type: boolean | undefined
    await TodoModel.findOne({ "_id": input }).then(data => type = data?.completed)
    if ((await TodoModel.updateOne({ "_id": input }, { "completed": !type })).matchedCount) return true
    else return false
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async updateTodo(
    @Arg("input", () => UpdateTodoInput) input: UpdateTodoInput) {
    if ((await TodoModel.updateOne({ "_id": input._id }, { "comment": input.newComment })).matchedCount) return true
    else return false
  }
}