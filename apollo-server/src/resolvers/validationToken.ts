import * as jwt from "jsonwebtoken"
import TodoApi from "@/config"

export const validationToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, TodoApi.LOGIN_SECRET)
    return decoded
  } catch(err) {
    return false
  }
}