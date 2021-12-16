import {
  Arg,
  Mutation,
  Resolver
} from "type-graphql"
// import User from "../../entity/User";
import { UserModel } from "../../models/user"
import LogInInput from "./userInput/LogInInput"

@Resolver()
export default class UserMutationResolver {
  // MUTATIONS
  @Mutation(() => Boolean)
  async addUser(
    @Arg("input", () => LogInInput) input: LogInInput) {
    if (await UserModel.exists({userId: input.userId})) return false
    await new UserModel(input).save()
    return true
  }
}