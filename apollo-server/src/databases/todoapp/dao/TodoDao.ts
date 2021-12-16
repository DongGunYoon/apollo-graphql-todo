import Todo from "@/entity/Todo"
import CreateTodoInput from "../../../resolvers/Todo/todoInput/CreateTodoInput"
import { Dao } from "../../common/decorators"
import { TodoModel } from "../models/todo"

@Dao(TodoModel)

class TodoDao {
  async getTodosByName(name: string): Promise<Todo[]> {
    return await TodoModel.find({name: name})
  }

  validationCheckByName(clientName: string, tokenName: string): boolean {
    return (clientName === tokenName)
  }

  async validationCheckById(_id: string, tokenName: string): Promise<boolean>{
    const todo = (await TodoModel.findOne({_id: _id}))?.name
    return (tokenName === todo)
  }

  async addTodo(input: CreateTodoInput) {
    return await new TodoModel(input).save()
  }

  async deleteTodo(_id: string): Promise<boolean>{
    if (!(await TodoModel.deleteOne({_id: _id})).deletedCount) return false
    return true
  }

  async toggleTodo(_id: string): Promise<boolean> {
    let type: boolean | undefined
    await TodoModel.findOne({ _id: _id }).then(data => type = data?.completed)
    if (!(await TodoModel.updateOne({ _id: _id }, {$set: { "completed": !type }})).modifiedCount) return false
    return true
  }

  async updateTodo(_id: string, comment: string): Promise<boolean> {
    if (!(await TodoModel.updateOne({ _id: _id }, {$set: { comment: comment }})).modifiedCount) return false
    return true
  }
}

export default new TodoDao()