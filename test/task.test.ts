import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import chai, { assert, expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import { buildSchemaSync } from 'type-graphql'
import resolvers from '../src/resolvers'

chai.should()

let server: ApolloServer

const mocks = {
    Mutation: {
        completeTask: () => {
            return {
                id: 'taskID',
                task: 'task completed',
                description: 'description completed',
                complete: true,
                updated_at: new Date()
            }
        },
        addTask: () => {
            return {
                id: 'newTaskID',
                task: 'new Task',
                description: 'new Task description',
                complete: false,
                created_at: new Date()
            }
        },
        updateTask: () => {
            return {
                id: 'taskID2',
                task: 'task updated',
                description: 'description updated',
                complete: false,
                updated_at: new Date()
            }
        },
        deleteTask: () => {
            return {
                id: 'taskID3',
                task: 'task deleted',
                description: 'description deleted',
                complete: true,
                updated_at: new Date()
            }
        }
    },
    DateTime: () => new Date()
}

before(async () => {

    const schema = buildSchemaSync({
        resolvers
      })

    server = new ApolloServer({
        schema,
        mocks
      })
})

after(async () => {
    server.stop()
})

describe('Test Task Resolvers', () => {
    it('GET_ALL_TASK - should return all tasks', async () => {

        const queryAllTasks = {
            query: `
            query Tasks{
                getAll {
                    id,
                    task,
                    description
                }
            }
            `
        }

        const res = await server.executeOperation(queryAllTasks)
        const data = res.data?.getAll
        data.should.be.a('array')
        data.length.should.be.eq(2)
        expect(data[0]).to.have.own.property('id')
        expect(data[0]).to.have.own.property('task')
        expect(data[0]).to.have.own.property('description')
    })

    it('GET_TASK_BY_ID - should return task by ID', async () => {

        const queryTaskByID = {
            query: `
                query Task($id: String!) {
                    getById(id: $id) {
                        id,
                        task,
                        description
                    }
                }
            `,
            variables: {id: 'Hello World'}
        }

        const res = await server.executeOperation(queryTaskByID)
        const data = res.data?.getById
        expect(data).to.be.an('object')
        expect(data).to.have.own.property('id')
        expect(data).to.have.own.property('task')
        expect(data).to.have.own.property('description')
    })

    it('GET_TASK_BY_ID - should return error if no id parameter', async () => {

        const queryTaskByID = {
            query: `
                query Task($id: String!) {
                    getById(id: $id) {
                        id,
                        task,
                        description
                    }
                }
            `,
        }

        const res = await server.executeOperation(queryTaskByID)
        const data = res.data?.getById
        res.errors?.[0].message.should.be.eq(`Variable \"$id\" of required type \"String!\" was not provided.`)
        expect(data).to.be.an('undefined')
    })

    it('GET_USER_TASKS - should return user tasks', async () => {

        const queryUserTasks = {
            query: `
                query UserTask {
                    userTasks {
                        id,
                        task,
                        description
                    }
                }
            `,
        }

        const res = await server.executeOperation(queryUserTasks)
        const data = res.data?.userTasks
        data.should.be.a('array')
        data.length.should.be.eq(2)
        expect(data[0]).to.have.own.property('id')
        expect(data[0]).to.have.own.property('task')
        expect(data[0]).to.have.own.property('description')
    })

    it('ADD_TASK - should add task', async () => {

        const mutationAddTask = {
            query: `
                mutation AddTask($input: InputAddTask!) {
                    addTask(input: $input) {
                        id,
                        task,
                        description,
                        complete,
                        created_at
                    }
                }
            `,
            variables: {
                input: {
                    task: 'task',
                    description: 'description'
                }
            }
        }

        const res = await server.executeOperation(mutationAddTask)
        const data = res.data?.addTask
        expect(res.errors).to.be.an('undefined')
        expect(data).to.be.an('object')
        expect(data).to.have.own.property('id')
        expect(data).to.have.own.property('task')
        expect(data).to.have.own.property('description')
        expect(data).to.have.own.property('complete')
        expect(data).to.have.own.property('created_at')
        data.id.should.be.eq('newTaskID')
        data.task.should.be.eq('new Task')
        data.description.should.be.eq('new Task description')
        data.complete.should.be.eq(false)
    })

    it('COMPLETE_TASK - should mark as complete the task', async () => {

        const mutationCompleteTask = {
            query: `
                mutation CompleteTask($id: String!) {
                    completeTask(id: $id) {
                        id,
                        task,
                        description,
                        complete,
                        updated_at
                    }
                }
            `,
            variables: {
                id: 'testID'
            }
        }

        const res = await server.executeOperation(mutationCompleteTask)
        const data = res.data?.completeTask
        expect(res.errors).to.be.an('undefined')
        expect(data).to.be.an('object')
        expect(data).to.have.own.property('id')
        expect(data).to.have.own.property('task')
        expect(data).to.have.own.property('description')
        expect(data).to.have.own.property('complete')
        expect(data).to.have.own.property('updated_at')
        data.id.should.be.eq('taskID')
        data.task.should.be.eq('task completed')
        data.description.should.be.eq('description completed')
        data.complete.should.be.eq(true)
    })

    it('UPDATE_TASK - should update task', async () => {

        const payload = {
            task: 'task updated',
            description: 'description updated'
        }

        const mutationUpdateTask = {
            query: `
                mutation UpdateTask($id: String!, $payload: InputUpdateTask!) {
                    updateTask(id: $id, payload: $payload) {
                        task,
                        description
                    }
                }
            `,
            variables: {
                id: 'testID2',
                payload
            }
        }

        const res = await server.executeOperation(mutationUpdateTask)
        const data = res.data?.updateTask
        expect(res.errors).to.be.an('undefined')
        expect(data).to.be.an('object')
        expect(data).to.have.own.property('task')
        expect(data).to.have.own.property('description')
        expect(payload.task).to.equal(data.task)
        expect(payload.description).to.equal(data.description)
    })


    it('DELETE_TASK - should delete task', async () => {

        const mutationDeleteTask = {
            query: `
                mutation DeleteTask($id: String!) {
                    deleteTask(id: $id) {
                        id,
                        task,
                        description,
                        complete
                    }
                }
            `,
            variables: {
                id: 'testID3'
            }
        }

        const shouldBeDeleted = {
            id: 'taskID3',
            task: 'task deleted',
            description: 'description deleted',
            complete: true
        }

        const res = await server.executeOperation(mutationDeleteTask)
        const data = res.data?.deleteTask
        expect(res.errors).to.be.an('undefined')
        expect(data).to.be.an('object')
        expect(data.id).to.equal(shouldBeDeleted.id)
        expect(data.task).to.equal(shouldBeDeleted.task)
        expect(data.description).to.equal(shouldBeDeleted.description)
        expect(data.complete).to.equal(shouldBeDeleted.complete)
    })

})