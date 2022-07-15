import { Context } from './../context'
import { LoginResponse, User, UserLoginInput, UserRegisterInput } from './../schema/user.schema'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import * as argon from 'argon2'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { isAuthenticated } from '../utils/isAuthenticated'

@Resolver()
export class UserResolver {

    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    me(@Ctx() context: Context) {
        return context
    }

    @Mutation(() => User)
    async register(
        @Arg('input') input: UserRegisterInput,
        @Ctx() context: Context
    ): Promise<User> {

        try {

            const hash = await argon.hash(input.password)
            const user = await context.prisma.user.create({
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

    @Mutation(() => LoginResponse)
    async login(
        @Arg('input') input: UserLoginInput,
        @Ctx() context: Context
    ): Promise<LoginResponse> {
        try {
            const {email, password} = input

            // find the user
            const user = await context.prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!user) throw new Error('Invalid credentials')

            // check the password
            const match = await argon.verify(user.password, password)

            if(!match) throw new Error('Incorrect password')

            // generate access and refresh token
            let payload = {user_id: user.id, email: user.email}
            const access_token = signAccessToken(payload)
            const refresh_token = signRefreshToken(payload)

            context.res.cookie('token', refresh_token, {
                httpOnly: true,
                path: '/refresh_token'
            })


            return {
                access_token
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}