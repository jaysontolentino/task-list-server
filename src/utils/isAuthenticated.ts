import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";
import { publicKey, verifyToken } from "./jwt";

export const isAuthenticated: MiddlewareFn<Context> = function({context}, next) {

    const auth = context.req.headers['authorization']

    if(!auth) throw new Error('Unauthorized')

    try {
        const token = auth.split(' ')[1]

        const decoded = verifyToken(token, publicKey)
        console.log(decoded)
    } catch (error) {
        throw new Error('Unauthorized')
    }

    return next();
}