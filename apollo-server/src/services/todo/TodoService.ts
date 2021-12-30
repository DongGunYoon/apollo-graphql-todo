import Todo from "@/entity/Todo"
import CreateTodoInput from "@/resolvers/Todo/todoInput/CreateTodoInput"
import { Service } from "typedi"
import axios from "axios"
import config from "@/config"
import TodoDao from "@/databases/todoapp/dao/TodoDao"
import { TodoModel } from "@/databases/todoapp/models/todo"
import { ApolloError } from "apollo-server-express"

@Service()
export default class TodoService {

  static async getAddress(latitude: string, longitude: string): Promise<string> {
    let address = ""
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${config.GEO_API_KEY}`)
      .then(result => {
        address = result.data.results[0].formatted_address
      })
    return address
  }

  static async addTodo(input: CreateTodoInput, tokenNickname: string): Promise<Todo> {
    const todo = TodoDao.createDefaultTodo(input)
    todo.nickname = tokenNickname
    todo.address = await this.getAddress(input.latitude, input.longitude)
    await TodoModel.create(todo)
    return todo
  }
  
  static async deleteTodo(_id: string, tokenNickname: string): Promise<boolean> {
    if (!await this.validationCheckById(_id, tokenNickname)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.deleteTodo(_id)
  }

  static async validationCheckById(_id: string, tokenNickname: string): Promise<boolean> {
    const todoNickname = await TodoDao.getUserNicknameById(_id)
    return (tokenNickname === todoNickname)
  }

  static async toggleTodo(_id: string, tokenId: string): Promise<boolean> {
    if (!await this.validationCheckById(_id, tokenId)) throw new ApolloError("Abnormal Active Detected!")
    const type = await TodoDao.getCompletedType(_id)
    return await TodoDao.toggleTodo(_id, type)
  }

  static async updateTodo(_id: string, tokenNickname: string, newComment: string): Promise<boolean> {
    if (!await this.validationCheckById(_id, tokenNickname)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.updateTodo(_id, newComment)
  }
}
