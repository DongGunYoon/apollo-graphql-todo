import {
  InputType,
  Field
} from "type-graphql"
  
  @InputType()
export default class SignUpInput {
      @Field(() => String, { nullable: false })
      userId!: string;
  
      @Field(() => String, { nullable: false })
      userPw!: string
      
      @Field(() => String, { nullable: false })
      nickname!: string
}