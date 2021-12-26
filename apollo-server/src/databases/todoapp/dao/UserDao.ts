import { Dao } from "../../common/decorators"
import { UserModel } from "../models/user"
import LogInInput from "../../../resolvers/User/userInput/LogInInput"
import User from "@/entity/User"

@Dao(UserModel)
class UserDao {
  async isValidId(userId: string): Promise<boolean> {
    return !await UserModel.exists({"userId": userId})
  }

  async getAllNicknames(): Promise<string[]> {
    const usersNickname = await UserModel.find({},{
      _id:0,
      nickname: 1
    })

    return usersNickname.map(res => res.nickname)
  }

  async matchedUser(userId: string, userPw: string): Promise<User | null>{
    return await UserModel.findOne({$and : [{"userId": userId}, {"userPw": userPw}]})
  }

  async addUser(input: LogInInput): Promise<void> {
    await new UserModel(input).save()
  }
}

export default new UserDao()