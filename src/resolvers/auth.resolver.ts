import { Context } from './../context'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { LoginResponse, UserLoginInput, UserRegisterInput } from './../schema/auth.schema'
import { User } from '../schema/user.schema'
import { AuthService } from '../services/auth.service'

@Resolver()
export default class UserResolver {

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
                access_token
            }

        } catch (error) {
            throw error
        }
    }

}