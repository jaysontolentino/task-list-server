import { Mutation, Query, Resolver } from "type-graphql";
import { TaskService } from "../services/task.service";

@Resolver()
export class TaskResolver {

    protected taskService

    constructor() {
        this.taskService = new TaskService()
    }

    //get all tasks
    @Query()
    async tasks() {

    }

    //get task by id
    @Query()
    async getById() {

    }

    //add task
    @Mutation()
    async addTask() {

    }

    //update task
    @Mutation()
    async updateTask() {

    }

    //delete task
    @Mutation()
    async deleteTask() {

    }
}