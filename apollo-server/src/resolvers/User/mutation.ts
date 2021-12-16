import UserDao from "../../databases/todoapp/dao/UserDao"
import {
  Arg,
  Mutation,
  Resolver
} from "type-graphql"
// import User from "../../entity/User";
import LogInInput from "./userInput/LogInInput"

@Resolver()
export default class UserMutationResolver {
  // MUTATIONS
  @Mutation(() => Boolean)
  async addUser(
    @Arg("input", () => LogInInput) input: LogInInput) {
    return await UserDao.addUser(input)
  }
}