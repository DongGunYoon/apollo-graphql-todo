import User from "../../../entity/User"
import { getModelForClass } from "@typegoose/typegoose"
import TodoDatabase from "../db"

export const UserModel = getModelForClass(User, {
  existingConnection: TodoDatabase.getConnection(),
  schemaOptions: {
    autoCreate: true, // mongoose.connection 에서 open 이벤트를 받아 자동 생성
    collection: "users",
    timestamps: {
      updatedAt: false,
      createdAt: true
    },
    versionKey: false
  }
})