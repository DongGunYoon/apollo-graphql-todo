import UserDao from "@/databases/todoapp/dao/UserDao"
import LogInInput from "@/resolvers/User/userInput/LogInInput"
import * as jwt from "jsonwebtoken"
import TodoApi from "@/config"
import { Service } from "typedi"
import SignUpInput from "@/resolvers/User/userInput/SignUpInput"

@Service()
export default class UserService {
  static async isExistingAccount(input: LogInInput): Promise<string> {
    const user = await UserDao.matchedUser(input.userId, input.userPw)
    if (!user) return "FAIL"
    return this.generateToken(user._id, user.userId, user.nickname)
  }

  static generateToken(_id: string, userId: string, nickname: string): string {
    return jwt.sign({
      _id: _id,
      userId: userId,
      nickname: nickname
    },
    TodoApi.LOGIN_SECRET, { expiresIn: "2h" })
  }

  static async addUser(input: SignUpInput): Promise<boolean> {
    if (! await UserDao.isValidId(input.userId)) return false
    if (! await UserDao.isValidNickname(input.nickname)) return false

    await UserDao.addUser(input)
    return true
  }
}
