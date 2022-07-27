
import { Field, ObjectType } from "type-graphql";
import { Task } from "./task.schema";

@ObjectType()
export class User {
    @Field(() => Number)
    id!: number

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => [Task], {nullable: true})
    tasks!: Task[]
}
