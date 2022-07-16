import { AuthChecker } from 'type-graphql'
import { Context } from '../context'

export const authChecker: AuthChecker<Context> = function({context}) {

    const user = context.user

    if(!user) return false

    return true
}