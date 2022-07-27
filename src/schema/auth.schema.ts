import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import { User } from './user.schema';


@InputType()
export class UserRegisterInput {
    @Field(() => String)
    name!: string

    @Field(() => String)
    @IsEmail()
    email!: string;

    @Field(() => String)
    @MinLength(8)
    password!: string;
}

@InputType()
export class UserLoginInput {

    @Field(() => String)
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @Field(() => String)
    @IsNotEmpty()
    password!: string
}

@ObjectType()
export class RegisterResponse {
    @Field(() => Number)
    id!: number

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    access_token!: string

    @Field()
    user!: RegisterResponse
}

@ObjectType()
export class DecodedToken {
    @Field(() => Number)
    user_id!: number

    @Field(() => String)
    email!: string

    @Field(() => Number)
    iat!: number

    @Field(() => Number)
    exp!: number
}

@ObjectType()
export class RefreshTokenResponse {
    @Field()
    accessToken!: string
}