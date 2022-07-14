import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInput {
    @Field()
    name!: string

    @Field()
    @IsEmail()
    email!: string;

    @Field()
    password!: string;
}