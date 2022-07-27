import { User } from '@prisma/client';
import { Context } from './../context';
import { isAuthenticated } from './../utils/isAuthenticated';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TaskService } from "../services/task.service";
import { DecodedToken } from '../schema/auth.schema';
import { InputAddTask, Task } from '../schema/task.schema';

@Resolver()
export default class TaskResolver {

    protected taskService

    constructor() {
        this.taskService = new TaskService()
    }

    //get all tasks
    @Query(() => [Task])
    @UseMiddleware(isAuthenticated)
    async getAll() {
        try {
            const tasks = await this.taskService.getAll()
            return tasks
        } catch (error) {
            throw error  
        }
    }

    //get task by id
    @Query(() => Task)
    @UseMiddleware(isAuthenticated)
    async getById(@Arg('id') id: string) {
        try {
            const task = await this.taskService.get(id)
            return task
        } catch (error) {
            throw error
        }
    }

    //add task
    @Mutation(() => Task)
    @UseMiddleware(isAuthenticated)
    async addTask(
        @Ctx() context: Context,
        @Arg('input') input: InputAddTask) {
        const user = context.user as DecodedToken

        try {
            const task = await this.taskService.add(user?.user_id, input)
            return task
        } catch (error) {
            
        }
    }

    //update task
    // @Mutation()
    // @UseMiddleware(isAuthenticated)
    // async updateTask() {

    // }

    // //delete task
    // @Mutation()
    // @UseMiddleware(isAuthenticated)
    // async deleteTask() {

    // }
}