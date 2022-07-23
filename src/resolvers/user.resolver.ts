import { Context } from './../context'
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserService } from '../services/user.service'
import { DecodedToken } from './../schema/auth.schema'
import { isAuthenticated } from '../utils/isAuthenticated'
import { User } from '../schema/user.schema'

@Resolver()
export default class UserResolver {

    protected userService

    constructor() {
        this.userService = new UserService
    }

    @Query(() => User, {nullable: true})
    @UseMiddleware(isAuthenticated)
    async user(@Ctx() context: Context) {
        
        const authUser = context.user

        try {
            const profile = await this.userService.profile(authUser?.user_id as string)
            return profile
        } catch (error) {
            throw error
        }

    }

}