import { validationToken } from "@/resolvers/validationToken"
import { ApolloServer } from "apollo-server-express"
import FriendSchema from "../Friend/FriendSchema"

const create = async (app: any) => {
  const schema = await FriendSchema
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
    path: "/friend",
    cors: true,
  })
}

export default create