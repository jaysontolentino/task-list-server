import { NonEmptyArray } from 'type-graphql'
import userResolver from './user.resolver'
import authResolver from './auth.resolver'
import taskResolver from './task.resolver'

export default [
    authResolver,
    userResolver,
    taskResolver
] as NonEmptyArray<Function> | NonEmptyArray<string>