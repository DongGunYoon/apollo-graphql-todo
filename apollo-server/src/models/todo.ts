import { getModelForClass } from "@typegoose/typegoose"
import Todo from "../entity/Todo"
import TodoDatabase from "../config/db"

export const TodoModel = getModelForClass(Todo, {
  existingConnection: TodoDatabase.getConnection(),
  schemaOptions: {
    autoCreate: true, // mongoose.connection 에서 open 이벤트를 받아 자동 생성
    collection: "todos",
    timestamps: {
      updatedAt: false,
      createdAt: true
    },
    versionKey: false
  }
})