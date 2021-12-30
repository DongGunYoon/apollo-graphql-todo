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
    
    @Field(() => String, { nullable: false })
    @Prop({
      type: String,
      required: true
    })
    nickname!: string

    @Field(() => [String], {nullable: true})
    @Prop({
      type: [String],
      required: false
    })
    friendList?: string[]
    
    @Field(() => [String], {nullable: true})
    @Prop({
      type: [String],
      required: false
    })
    sentFriendRequestList?: string[]
    
    @Field(() => [String], {nullable: true})
    @Prop({
      type: [String],
      required: false
    })
    receivedFriendRequestList?: string[]
}