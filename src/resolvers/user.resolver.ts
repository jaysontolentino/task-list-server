import { Context } from './../context'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { UserService } from '../services/user.service'
import { DecodedToken } from './../schema/auth.schema'

@Resolver()
export default class UserResolver {

    protected userService

    constructor() {
        this.userService = new UserService
    }

    @Authorized()
    @Query(() => DecodedToken)
    me(@Ctx() context: Context) {

        return context.user
        
    }

}