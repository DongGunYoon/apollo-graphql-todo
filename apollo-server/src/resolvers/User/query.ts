import {
  Arg,
  Query,
  Resolver
} from "type-graphql"
import LogInInput from "./userInput/LogInInput"
import UserDao from "../../databases/todoapp/dao/UserDao"

@Resolver()
export default class UserQueryResolver {
    // QUERIES
    @Query(() => String)
  async getLogInResult(
      @Arg("input", () => LogInInput) input: LogInInput) {
      
    const user = await UserDao.exists(input.userId)
    if (!user) return "FAIL"

    return await UserDao.generateToken(user._id, user.userId)
  }
}