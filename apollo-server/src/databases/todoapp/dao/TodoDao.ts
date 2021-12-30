import Todo from "@/entity/Todo"
import CreateTodoInput from "../../../resolvers/Todo/todoInput/CreateTodoInput"
import { Dao } from "../../common/decorators"
import { TodoModel } from "../models/todo"

@Dao(TodoModel)
class TodoDao {
  async getTodosByName(nickname: string): Promise<Todo[]>{
    return await TodoModel.find({nickname: nickname})
  }

  async getAllCommentsAndCompletedOfNickname(nickname: string): Promise<[string, boolean][]> {
    const result = await TodoModel.find({"nickname": nickname}, {
      comment:1,
      completed:1
    })

    return result.map(res => [res.comment, res.completed])
  }

  async getUserNicknameById(_id: string): Promise<string | undefined> {
    return await TodoModel.findOne({"_id": _id}).then(res => res?.nickname)
  }

  createDefaultTodo(input: CreateTodoInput): Todo {
    return new TodoModel(input)
  }

  validationCheckByName(clientName: string, tokenName: string): boolean {
    return (clientName === tokenName)
  }

  async validationCheckById(_id: string, tokenName: string): Promise<boolean> {
    const todoName = (await TodoModel.findOne({_id: _id}))?.nickname
    return (tokenName === todoName)
  }

  async addTodo(input: CreateTodoInput): Promise<Todo> {
    return await new TodoModel(input).save()
  }

  async deleteTodo(_id: string): Promise<boolean> {
    return !!(await TodoModel.deleteOne({_id: _id})).deletedCount
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