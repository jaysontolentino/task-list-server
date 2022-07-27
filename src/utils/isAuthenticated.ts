import { AuthenticationError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";
import { prisma } from "./prisma";

export const isAuthenticated: MiddlewareFn<Context> = async function({context}, next) {

    const authUser = context.user

    if(!authUser) throw new AuthenticationError('Unauthorized')

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: authUser.user_id
            }
        })

        if(!user) throw new AuthenticationError('Unauthorized')

        return next();
     
    } catch (error) {
        throw new AuthenticationError('Unauthorized')
    }

}