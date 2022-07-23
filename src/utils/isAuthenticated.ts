import { AuthenticationError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";
import { DecodedToken } from "../schema/auth.schema";
import { publicKey, verifyToken } from "./jwt";
import { prisma } from "./prisma";

export const isAuthenticated: MiddlewareFn<Context> = async function(args, next) {

    const auth =  args.context.req.headers['authorization']

    if(!auth) throw new AuthenticationError('Unauthorized')

    try {
        const token = auth.split(' ')[1]

        const decoded = verifyToken<DecodedToken>(token, publicKey)

        const user = await prisma.user.findUnique({
            where: {
                id: decoded?.user_id
            }
        })

        if(!user) throw new AuthenticationError('Unauthorized')

        return next();
     
    } catch (error) {
        throw new AuthenticationError('Unauthorized')
    }

    
}