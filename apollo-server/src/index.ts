import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import TodoQueryResolver from "./resolvers/Todo/query"
import TodoMutationResolver from "./resolvers/Todo/mutation"
import TodoDatabase from "./config/db";
import cors = require("cors");
import UserQueryResolver from "./resolvers/User/query";
import UserMutationResolver from "./resolvers/User/mutation";
// import { UserModel } from "./models/user";
import {validationToken} from "./resolvers/validationToken"

(async () => {
    const schema = await buildSchema({
        resolvers: [
            TodoQueryResolver,
            TodoMutationResolver,
            UserQueryResolver,
            UserMutationResolver
        ],
        // authChecker,
    });

    TodoDatabase.getConnection();
    const app = express();

    const server = new ApolloServer({
        schema,
        context: async ({ req, res }: any) => {
            let user: any = null

            if (req.headers.authorization) {
                const userData = validationToken(req.headers.authorization);
                if (userData) user = userData
                // const token = req.headers.authorization;
                // user = await UserModel.findOne({ token: token });
            }
            return {
                user,
                req,
                res,
            }
        },
    });

    app.use(cors());

    server.applyMiddleware({
        app,
        path: "/graphql",
        cors: false,
    });

    app.listen({ port: 3000 }, () => {
        console.log(`🚀 Server is starting on ${server.graphqlPath} ..`)
    }
    );
})();