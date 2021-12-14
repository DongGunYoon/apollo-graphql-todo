// import { mongoose } from "@typegoose/typegoose";
import {
  Arg,
  Query,
  Resolver
} from "type-graphql"
import User from "../../entity/User"
import { UserModel } from "../../models/user"
import LogInInput from "./userInput/LogInInput"

// var jwt = require('jsonwebtoken');
import * as jwt from "jsonwebtoken"

@Resolver()
export default class UserQueryResolver {
    // QUERIES
    @Query(() => [User])
  async getUsers() {
    const users = UserModel.find()
    return users
  }

    @Query(() => String)
    async getLogInResult(
        @Arg("input", () => LogInInput) input: LogInInput) {

      const user = await UserModel.findOne({ userId: input.userId })
      if (!user) return "FAIL"

      const token = jwt.sign({
        _id: user?._id,
        userId: user?.userId
      },
      "asdf1234", { expiresIn: "1h" })
      
      return token
    }
}