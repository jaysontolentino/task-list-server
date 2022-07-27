import { prisma } from '../utils/prisma'

export class UserService {

    async profile(id: number) {
        
        try {

            const user = await prisma.user.findUnique({
                where: {id},
                include: {
                    tasks: true
                }
            })

            return user
        } catch (error) {
            throw error
        }
    }


}