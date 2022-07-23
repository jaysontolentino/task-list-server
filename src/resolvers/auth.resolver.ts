import { Context } from './../context'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { privateKey, signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt'
import { DecodedToken, LoginResponse, RefreshTokenResponse, UserLoginInput, UserRegisterInput } from './../schema/auth.schema'
import { User } from '../schema/user.schema'
import { AuthService } from '../services/auth.service'
import { prisma } from '../utils/prisma'

@Resolver()
export default class AuthResolver {

    protected authService

    constructor() {
        this.authService = new AuthService
    }

    @Mutation(() => User)
    async register(
        @Arg('input') input: UserRegisterInput
    ): Promise<User> {

        try {
            const user = await this.authService.register(input)
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

            const user = await this.authService.login(input)
            // generate access and refresh token
            let payload = {user_id: user.id, email: user.email}
            const access_token = signAccessToken(payload)
            const refresh_token = signRefreshToken(payload)
        
            context.res.cookie('token', refresh_token, {
                httpOnly: true,
                path: '/'
            })
        
            return {
                access_token,
                user
            }

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => Boolean)
    logout(@Ctx() context: Context) {
        context.res.cookie('token', '', {
            httpOnly: true,
            path: '/'
        })

        return true
    }

    @Mutation(() => RefreshTokenResponse)
    async refreshToken(@Ctx() context: Context): Promise<RefreshTokenResponse> {

        const {token} = context.req.cookies

        if(!token) return { accessToken: '' }

        try {

            const decoded = verifyToken<DecodedToken>(token, privateKey)

            const user = await prisma.user.findUnique({
                where: {
                    id: decoded?.user_id
                }
            })

            if(!user) return { accessToken: ''}

            const payload = {
                ...user,
                user_id: user.id,
                email: user.email
            }

            const accessToken = signAccessToken(payload)

            console.log(`Refreshed Token: ${accessToken}`)

            return {accessToken}

        } catch (error) {
            throw error
        }

    }

}