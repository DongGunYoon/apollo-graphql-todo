import { ApolloServer } from "apollo-server-express"
import UserSchema from "./UserSchema"

const create = async (app: any) => {
  const schema = await UserSchema
  const server = new ApolloServer({
    schema,
    context: async ({
      req, res
    }: any) => {
  
      return {
        req,
        res,
      }
    },
  })
  
  server.applyMiddleware({
    app,
    path: "/user",
    cors: true,
  })

  console.log(`🚀Server is starting on ${server.graphqlPath}...`)
}

export default create