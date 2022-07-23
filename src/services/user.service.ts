import { PrismaClient } from '@prisma/client'
import { UserLoginInput, UserRegisterInput } from '../schema/auth.schema'
import * as argon from 'argon2'
import { prisma } from '../utils/prisma'

export class UserService {

    async profile(id: string) {
        try {

            const user = await prisma.user.findUnique({
                where: {id}
            })

            return user
        } catch (error) {
            throw error
        }
    }


}