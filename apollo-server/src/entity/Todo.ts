import { Prop } from "@typegoose/typegoose"
import {
  Field,
  ObjectType
} from "type-graphql"

@ObjectType({})
export default class Todo {
    @Field(() => String, { nullable: false })
    _id!: string;

    @Field(() => String, {nullable: false})
    @Prop({
      type: String,
      required: true
    })
    latitude!: string;
    
    @Field(() => String, {nullable: false})
    @Prop({
      type: String,
      required: true
    })
    longitude!: string;

    @Field(() => String, { nullable: false })
    @Prop({
      type: String,
      required: true
    })
    nickname!: string;

    @Field(() => String, {nullable: false})
    @Prop({
      type: String,
      required: true
    })
    address!: string;

    @Field(() => String, { nullable: false })
    @Prop({
      type: String,
      required: true
    })
    comment!: string

    @Field(() => Boolean, { nullable: true })
    @Prop({
      type: Boolean,
      required: false,
      default: false
    })
    completed!: boolean;

    @Field(() => Date, { nullable: true })
    @Prop({
      type: Date,
      required: false,
      default: Date.now
    })
    createdAt!: Date;
}