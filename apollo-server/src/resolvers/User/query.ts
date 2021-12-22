import {
  Arg,
  Query,
  Resolver
} from "type-graphql"
import LogInInput from "./userInput/LogInInput"
import UserService from "../../services/user/UserService"

@Resolver()
export default class UserQueryResolver {
  // QUERIES
  @Query(() => String)
  async getLogInResult(
  @Arg("input", () => LogInInput) input: LogInInput) {
    return await UserService.isExistingAccount(input)
  }
}