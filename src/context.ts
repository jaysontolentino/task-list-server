import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient

export function createContext(req: Request, res: Response) {
    return {
        req, 
        res, 
        prisma
    }
}

export type Context = ReturnType<typeof createContext>