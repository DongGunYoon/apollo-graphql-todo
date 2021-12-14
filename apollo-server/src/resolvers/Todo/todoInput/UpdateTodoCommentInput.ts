import {
  InputType,
  Field
} from "type-graphql"

@InputType()
export default class UpdateTodoInput {
    @Field(() => String, { nullable: false })
    _id!: string;

    @Field(() => String, { nullable: false })
    newComment!: string
}