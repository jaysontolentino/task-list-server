
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => Number)
    id!: number

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string
}
