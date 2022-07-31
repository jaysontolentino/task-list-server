import { User } from "@prisma/client";
import { prisma } from "../utils/prisma";

export class TaskService {

    async getAll() {
        try {
            const tasks = await prisma.task.findMany()
            return tasks
        } catch (error) {
            throw error
        }
    }

    async userTasks(userId: number) {
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    userId
                }
            })
            return tasks
        } catch (error) {
            throw error
        }
    }

    async get(id: string) {
        try {
            const task = await prisma.task.findUnique({
                where: {
                    id
                }
            })

            return task
        } catch (error) {
            throw error
        }
    }

    async add(userId: number, payload: {
        task: string
        description: string
    }) {
        try {
            const task = await prisma.task.create({
                data: {
                    ...payload,
                    user: {
                        connect: {id: userId}
                    }
                }
            })
            return task
        } catch (error) {
            throw error
        }
    }

    async update(id: string, payload: {
        task?: string
        description?: string
        isCompleted?: boolean
    }) {
        try {
            const updatedTask = await prisma.task.update({
                where: {
                    id
                },
                data: payload
            })

            return updatedTask
        } catch (error) {
            throw error
        }
    }

    async complete(id: string) {
        try {
            const task = await prisma.task.update({
                where: {
                    id
                },
                data: {
                    complete: true
                }
            })

            return task
        } catch (error) {
            throw error
        }
    }

    async delete(id: string) {
        try {
            const task = await prisma.task.delete({
                where: {id}
            })
            return task
        } catch (error) {
            throw error
        }
    }

}