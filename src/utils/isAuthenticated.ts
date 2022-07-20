import { AuthenticationError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";
import { publicKey, verifyToken } from "./jwt";

export const isAuthenticated: MiddlewareFn<Context> = async function(args, next) {

    const auth =  args.context.req.headers['authorization']

    if(!auth) throw new AuthenticationError('Unauthorized')

    try {
        const token = auth.split(' ')[1]

        const decoded = verifyToken(token, publicKey)
     
    } catch (error) {
        throw new AuthenticationError('Unauthorized')
    }

    return next();
}