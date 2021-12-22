import {
  Arg,
  Mutation,
  Resolver
} from "type-graphql"
import SignUpInput from "./userInput/SignUpInput"
import UserService from "@/services/user/UserService"

@Resolver()
export default class UserMutationResolver {
  // MUTATIONS
  @Mutation(() => Boolean)
  async addUser(
    @Arg("input", () => SignUpInput) input: SignUpInput) {
    return await UserService.addUser(input)
  }
}