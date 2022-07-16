import { IsEmail } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

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

@ObjectType()
export class DecodedToken {
    @Field(() => String)
    user_id!: string

    @Field(() => String)
    email!: string

    @Field(() => Number)
    iat!: number

    @Field(() => Number)
    exp!: number
}