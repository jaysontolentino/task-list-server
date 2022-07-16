import { Request, Response } from 'express'
import { publicKey, verifyToken } from './utils/jwt'

function getUser(req: Request) {
    const authorization = req.headers['authorization']

    if(!authorization) return null

    try {
        const token = authorization.split(' ')[1]
        const decoded = verifyToken(token, publicKey)
        return decoded
    } catch (error) {
        return null
    }
}

export function createContext({req, res}: {req: Request, res: Response}) {

    const user = getUser(req)
    
    return {
        req, 
        res,
        user
    }
}

export type Context = ReturnType<typeof createContext>