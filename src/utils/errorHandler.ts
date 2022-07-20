import { ApolloError, UserInputError } from 'apollo-server';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { GraphQLError } from 'graphql'
import { JsonWebTokenError } from 'jsonwebtoken';

export function formatError(error: GraphQLError) {
    const err = error.originalError

    if(err instanceof PrismaClientKnownRequestError) {

        if(err.code === 'P2002') {
            return new UserInputError('Email already exist')
        }
        
    } else if(err instanceof PrismaClientInitializationError) {
        return new ApolloError(`Can't connect to database server`)
    }

    if(err instanceof JsonWebTokenError) return new ApolloError('Something went wrong')

    console.log(error)

    return error
}