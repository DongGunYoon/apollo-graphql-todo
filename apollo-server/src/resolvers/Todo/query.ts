// import { mongoose } from "@typegoose/typegoose";
// import { ApolloError } from "apollo-server-express";
import { Ctx, Query, Resolver } from "type-graphql";
import Todo from "../../entity/Todo"
import { TodoModel } from "../../models/todo";


@Resolver()
export default class TodoQueryResolver {
    @Query(() => [Todo])
    async getTodos(
        @Ctx() context: any,) {
        if (!context.user) throw new Error("Unauthorized")
        return TodoModel.find({ name: context.user.userId });
    }
}