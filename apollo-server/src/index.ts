require("module-alias").addAliases({ "@": __dirname })

import http from "http"
import "reflect-metadata"
import express from "express"
import TodoApi from "@/config"
import TodoServer from "@/servers/Todo/TodoServer"
import UserServer from "@/servers/User/UserServer"
import FriendServer from "./servers/Friend/FriendServer"

const createServer = async (app: any) => {
  await TodoServer(app)
  await UserServer(app)
  await FriendServer(app)
}

const startServer = async (app: any) => {
  const httpServer = http.createServer(app)
  httpServer.listen(TodoApi.PORT)
  console.log(`🚀Server is listening on ${TodoApi.PORT}...`)
}

(async () => {
  const app = express()
  await createServer(app)
  startServer(app)
})()