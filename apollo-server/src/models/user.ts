import { getModelForClass } from "@typegoose/typegoose";
import User from "../entity/User"
import TodoDatabase from "../config/db";

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