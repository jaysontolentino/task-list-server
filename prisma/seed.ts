import { PrismaClient, Prisma } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: 'password',
    tasks: {
      create: [
        {
          task: 'Shopping',
          description: 'Go to store'
        },
        {
            task: 'Cook Dinner',
            description: 'Cook dinner'
        },
        {
            task: 'Study',
            description: 'Watch and read tutorials'
        }
      ],
    },
  },
  {
    name: 'User1',
    email: 'user1@email.com',
    password: 'password',
    tasks: {
      create: [
        {
          task: 'Backend Task',
          description: 'Doing my backend tasks'
        },
        {
            task: 'Frontend Task',
            description: 'Doing my frontend tasks'
        },
        {
            task: 'Debugging',
            description: 'Debug and Fix errors'
        }
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const data of userData) {
    const hash = await argon2.hash(data.password)

    data.password = hash
    
    const user = await prisma.user.create({
      data,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })