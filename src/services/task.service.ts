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

    async get(id: string, data: object) {
        try {
            const updatedTask = await prisma.task.update({
                where: {
                    id
                },
                data
            })

            return updatedTask
        } catch (error) {
            throw error
        }
    }

    async add(data: any) {
        try {
            const task = await prisma.task.create({
                data
            })
            return task
        } catch (error) {
            throw error
        }
    }

    async update(id: string) {
        try {
            
        } catch (error) {
            
        }
    }

    async delete() {

    }
}