import { ApolloError } from 'apollo-server';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'
import { GraphQLError } from 'graphql'
import { JsonWebTokenError } from 'jsonwebtoken';

export function formatError(error: GraphQLError) {

    const err = error.originalError

    if(
        err instanceof PrismaClientKnownRequestError || 
        err instanceof PrismaClientInitializationError || 
        err instanceof PrismaClientUnknownRequestError || 
        err instanceof PrismaClientRustPanicError || 
        err instanceof PrismaClientValidationError) {
        return new ApolloError('Database Error')
    } else if(err instanceof JsonWebTokenError) return new ApolloError('Internal Server Error')

    //console.log(err)

    return error
}