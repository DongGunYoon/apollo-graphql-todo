import { Dao } from "../../common/decorators"
import { UserModel } from "../models/user"
import * as jwt from "jsonwebtoken"
import LogInInput from "../../../resolvers/User/userInput/LogInInput"
import TodoApi from "../../../config"
import User from "@/entity/User"

@Dao(UserModel)
class UserDao {
  async exists(input: string): Promise<User | null>{
    return await UserModel.findOne({userId: input})
  }

  generateToken(_id: string, userId: string): string {
    return jwt.sign({
      _id: _id,
      userId: userId
    },
    TodoApi.LOGIN_SECRET, { expiresIn: "1h" })
  }

  async addUser(input: LogInInput): Promise<boolean> {
    await new UserModel(input).save()
    return true
  }
}

export default new UserDao()