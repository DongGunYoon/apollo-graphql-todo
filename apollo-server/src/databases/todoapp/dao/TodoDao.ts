import Todo from "@/entity/Todo"
import CreateTodoInput from "../../../resolvers/Todo/todoInput/CreateTodoInput"
import { Dao } from "../../common/decorators"
import { TodoModel } from "../models/todo"

@Dao(TodoModel)
class TodoDao {
  async getTodosByName(name: string): Promise<Todo[]> {
    return await TodoModel.find({name: name})
  }

  async getUserNameById(_id: string): Promise<string | undefined> {
    const userName = await TodoModel.findOne({"_id": _id}).then(res => res?.name)
    return userName
  }

  async createDefaultTodo(input: CreateTodoInput): Promise<Todo> {
    return new TodoModel(input)
  }

  async deleteTodo(_id: string): Promise<boolean>{
    if (!(await TodoModel.deleteOne({_id: _id})).deletedCount) return false
    return true
  }

  async getCompletedType(_id: string): Promise<boolean> {
    let type: boolean | undefined
    await TodoModel.findOne({ _id: _id }).then(data => type = data?.completed)
    return type ? true : false
  }

  async toggleTodo(_id: string, type: boolean): Promise<boolean> {
    if (!(await TodoModel.updateOne({ _id: _id }, {$set: { "completed": !type }})).modifiedCount) return false
    return true
  }

  async updateTodo(_id: string, comment: string): Promise<boolean> {
    if (!(await TodoModel.updateOne({ _id: _id }, {$set: { comment: comment }})).modifiedCount) return false
    return true
  }
}

export default new TodoDao()