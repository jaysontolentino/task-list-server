import { ApolloError } from 'apollo-server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { GraphQLError } from 'graphql'
import { JsonWebTokenError } from 'jsonwebtoken';

export function formatError(error: GraphQLError) {
    const err = error.originalError

    if(err instanceof PrismaClientKnownRequestError) {

        if(err.code === 'P2002') {
            return new ApolloError('Email already exist')
        }
        
    }

    if(err instanceof JsonWebTokenError) return new ApolloError('Something went wrong')

    return new ApolloError(err?.message as string)
}