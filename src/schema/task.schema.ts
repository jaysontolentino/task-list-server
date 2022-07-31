import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Task {

    @Field(() => String)
    id!: string

    @Field(() => String)
    task!: string

    @Field(() => String)
    description!: string

    @Field(() => Boolean, {nullable: true})
    complete!: boolean

    @Field(() => Date)
    created_at!: Date

    @Field(() => Date)
    updated_at!: Date    
}

@InputType()
export class InputAddTask {
    @Field(() => String)
    task!: string

    @Field(() => String)
    description!: string
}