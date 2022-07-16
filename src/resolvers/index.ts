import { NonEmptyArray } from 'type-graphql'
import userResolver from './user.resolver'
import authResolver from './auth.resolver'

export default [
    authResolver,
    userResolver
] as NonEmptyArray<Function> | NonEmptyArray<string>