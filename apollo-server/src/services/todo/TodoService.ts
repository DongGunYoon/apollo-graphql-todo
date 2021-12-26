import UserDao from "@/databases/todoapp/dao/UserDao"
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
  static async getUsersNickname(input: string): Promise<string[]> {
    const usersNickname = await UserDao.getAllNicknames()
    const result = []
    const reg = new RegExp(input, "i")
    for (const userNickname of usersNickname) {
      if (userNickname.match(reg)?.length) result.push(userNickname)
    }
    return result
  }

  static async getAddress(latitude: string, longitude: string): Promise<string> {
    let address = ""
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${config.GEO_API_KEY}`)
      .then(result => {
        address = result.data.results[0].formatted_address
      })
    return address
  }

  static async addTodo(input: CreateTodoInput, tokenId: string): Promise<Todo> {
    const todo = TodoDao.createDefaultTodo(input)
    todo.name = tokenId
    todo.address = await this.getAddress(input.latitude, input.longitude)
    await TodoModel.create(todo)
    return todo
  }
  
  static async deleteTodo(_id: string, tokenId: string): Promise<boolean> {
    if (!await this.validationCheckById(_id, tokenId)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.deleteTodo(_id)
  }

  static async validationCheckById(_id: string, tokenId: string): Promise<boolean> {
    const todoName = await TodoDao.getUserNameById(_id)
    return (tokenId === todoName)
  }

  static async toggleTodo(_id: string, tokenId: string): Promise<boolean> {
    if (!await this.validationCheckById(_id, tokenId)) throw new ApolloError("Abnormal Active Detected!")
    const type = await TodoDao.getCompletedType(_id)
    return await TodoDao.toggleTodo(_id, type)
  }

  static async updateTodo(_id: string, tokenId: string, newComment: string): Promise<boolean> {
    if (!await this.validationCheckById(_id, tokenId)) throw new ApolloError("Abnormal Active Detected!")
    return await TodoDao.updateTodo(_id, newComment)
  }
}
