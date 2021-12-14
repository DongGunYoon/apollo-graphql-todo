import { Arg, Mutation, Resolver } from "type-graphql";
import User from "../../entity/User";
import { UserModel } from "../../models/user";
import LogInInput from "./userInput/LogInInput";

@Resolver()
export default class UserMutationResolver {
    // MUTATIONS
    @Mutation(() => User)
    async addUser(
        @Arg("input", () => LogInInput) input: LogInInput) {
        const user = await new UserModel(input)
        user.token = Math.random().toString(36).substring(2, 11);
        user.save();
        return user
    }
}