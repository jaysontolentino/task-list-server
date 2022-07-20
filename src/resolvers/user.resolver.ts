import { Context } from './../context'
import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserService } from '../services/user.service'
import { DecodedToken } from './../schema/auth.schema'
import { isAuthenticated } from '../utils/isAuthenticated'

@Resolver()
export default class UserResolver {

    protected userService

    constructor() {
        this.userService = new UserService
    }

    
    @Query(() => DecodedToken, {nullable: true})
    @UseMiddleware(isAuthenticated)
    me(@Ctx() context: Context) {

        return context.user
        
    }

}