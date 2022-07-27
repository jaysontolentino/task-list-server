import { Context } from './../context'
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserService } from '../services/user.service'
import { isAuthenticated } from '../utils/isAuthenticated'
import { User } from '../schema/user.schema'
import { DecodedToken } from '../schema/auth.schema'

@Resolver()
export default class UserResolver {

    protected userService

    constructor() {
        this.userService = new UserService
    }

    @Query(() => User, {nullable: true})
    @UseMiddleware(isAuthenticated)
    async user(@Ctx() context: Context) {
        
        const authUser = context.user as DecodedToken

        try {
            const profile = await this.userService.profile(authUser?.user_id)
            return profile
        } catch (error) {
            throw error
        }

    }

}