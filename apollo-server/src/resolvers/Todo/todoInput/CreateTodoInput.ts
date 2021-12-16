import {
  InputType,
  Field
} from "type-graphql"

@InputType()
export default class CreateTodoInput {
    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: false })
    comment!: string
}