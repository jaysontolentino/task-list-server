import { UserLoginInput, UserRegisterInput } from '../schema/auth.schema'
import * as argon from 'argon2'
import { prisma } from '../utils/prisma'

export class AuthService {

    async register(input: UserRegisterInput) {
        try {

            const hash = await argon.hash(input.password)
            const user = await prisma.user.create({
                data: {
                    ...input,
                    password: hash
                }
            })
            return user
        } catch (error) {
            throw error
        }
    }

    async login(input: UserLoginInput) {
        try {
            const {email, password} = input

            // find the user
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!user) throw new Error('Invalid credentials')

            // check the password
            const match = await argon.verify(user.password, password)

            if(!match) throw new Error('Incorrect password')

            return user
        } catch (error) {
            throw error
        }
    }

}