import { Context } from './../context';
import { isAuthenticated } from './../utils/isAuthenticated';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TaskService } from "../services/task.service";
import { DecodedToken } from '../schema/auth.schema';
import { InputAddTask, InputUpdateTask, Task } from '../schema/task.schema';
import { prisma } from '@prisma/client';

@Resolver()
export default class TaskResolver {

    protected taskService

    constructor() {
        this.taskService = new TaskService
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

    @Query(() => [Task])
    @UseMiddleware(isAuthenticated)
    async userTasks(@Ctx() context: Context) {
        try {
            const tasks = await this.taskService.userTasks(context.user?.user_id as number)
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

    @Mutation(() => Task)
    @UseMiddleware(isAuthenticated)
    async completeTask(@Arg('id') id: string ) {
        try {
            const task = await this.taskService.complete(id)
            return task
        } catch (error) {
            throw error
        }
    }

    //update single task
    @Mutation(() => Task)
    @UseMiddleware(isAuthenticated)
    async updateTask(@Arg('payload') payload: InputUpdateTask, @Arg('id') id: string) {
        try {
           const updatedTask = await this.taskService.update(id, payload)
           return updatedTask
        } catch (error) {
            throw error
        }
    }

    //delete task
    @Mutation(() => Task)
    @UseMiddleware(isAuthenticated)
    async deleteTask(@Arg('id') id: string) {
        try {
            const task = await this.taskService.delete(id)
            return task
        } catch (error) {
            throw error
        }
    }
}