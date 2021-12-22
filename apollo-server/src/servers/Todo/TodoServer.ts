import { ApolloServer } from "apollo-server-express"
import { validationToken } from "@/resolvers/validationToken"
import TodoSchema from "./TodoSchema"

const create = async (app: any) => {
  const schema = await TodoSchema
  const server = new ApolloServer({
    schema,
    context: ({
      req, res
    }: any) => {
      let user: any = null
  
      if (req.headers.authorization) {
        const userData = validationToken(req.headers.authorization)
        if (userData) user = userData
      }
      return {
        user,
        req,
        res
      }
    }
  })
  
  server.applyMiddleware({
    app,
    path: "/todo",
    cors: true,
  })
}

export default create