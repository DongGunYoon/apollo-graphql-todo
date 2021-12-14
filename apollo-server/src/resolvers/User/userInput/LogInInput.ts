import {
    InputType,
    Field
} from "type-graphql"

@InputType()
export default class LogInInput {
    @Field(() => String, { nullable: false })
    userId: string;

    @Field(() => String, { nullable: false })
    userPw: string

    @Field(() => String, { nullable: true, defaultValue: "dont worry" })
    token: string
}