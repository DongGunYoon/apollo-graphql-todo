import Todo from "@/entity/Todo"
import CreateTodoInput from "../../../resolvers/Todo/todoInput/CreateTodoInput"
import { Dao } from "../../common/decorators"
import { TodoModel } from "../models/todo"

@Dao(TodoModel)
class TodoDao {
  async getTodosByName(name: string): Promise<Todo[]>{
    return await TodoModel.find({name: name})
  }

  async getUserNameById(_id: string): Promise<string | undefined> {
    return await TodoModel.findOne({"_id": _id}).then(res => res?.name)
  }

  createDefaultTodo(input: CreateTodoInput): Todo {
    return new TodoModel(input)
  }

  validationCheckByName(clientName: string, tokenName: string): boolean {
    return (clientName === tokenName)
  }

  async validationCheckById(_id: string, tokenName: string): Promise<boolean> {
    const todoName = (await TodoModel.findOne({_id: _id}))?.name
    return (tokenName === todoName)
  }

  async addTodo(input: CreateTodoInput): Promise<Todo> {
    return await new TodoModel(input).save()
  }

  async deleteTodo(_id: string): Promise<boolean> {
    if (!await TodoModel.deleteOne({_id: _id}).deletedCount) return false
    return true
  }

  async getCompletedType(_id: string): Promise<boolean> {
    let type: boolean | undefined
    await TodoModel.findOne({ _id: _id }).then(data => type = data?.completed)
    return type ? true : false
  }

  async toggleTodo(_id: string, type: boolean): Promise<boolean> {
    return !!(await TodoModel.updateOne({ _id: _id }, {$set: { "completed": !type }})).modifiedCount
  }

  async updateTodo(_id: string, comment: string): Promise<boolean> {
    return !!(await TodoModel.updateOne({ _id: _id }, {$set: { comment: comment }})).modifiedCount
  }
}

export default new TodoDao()