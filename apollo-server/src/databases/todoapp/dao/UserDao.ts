import { Dao } from "../../common/decorators"
import { UserModel } from "../models/user"
import * as jwt from "jsonwebtoken"
import LogInInput from "../../../resolvers/User/userInput/LogInInput"
import TodoApi from "../../../config"

@Dao(UserModel)
class UserDao {
  async exists(input: string) {
    return await UserModel.findOne({userId: input})
  }

  async generateToken(_id: string, userId: string) {
    return jwt.sign({
      _id: _id,
      userId: userId
    },
    TodoApi.LOGIN_SECRET, { expiresIn: "1h" })
  }

  async addUser(input: LogInInput) {
    if (await UserModel.exists({userId: input.userId})) return false
    await new UserModel(input).save()
    return true
  }
}

export default new UserDao()