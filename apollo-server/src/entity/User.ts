import { Prop } from "@typegoose/typegoose"
import {
  Field,
  ObjectType
} from "type-graphql"

@ObjectType({})
export default class User {
    @Field(() => String, { nullable: false })
    _id!: string;

    @Field(() => String, { nullable: false })
    @Prop({
      type: String,
      required: true
    })
    userId!: string;

    @Prop({
      type: String,
      required: true
    })
    userPw!: string
}