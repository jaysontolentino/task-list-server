import { IsEmail } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => String)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string
}

@InputType()
export class UserRegisterInput {
    @Field(() => String)
    name!: string

    @Field(() => String)
    @IsEmail()
    email!: string;

    @Field(() => String)
    password!: string;
}

@InputType()
export class UserLoginInput {
    @Field(() => String)
    email!: string

    @Field(() => String)
    password!: string
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    access_token!: string
}