import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'g.bokuchava22@gmail.com'
  const password = process.argv[2]

  if (!password) {
    console.error('Please provide a password as an argument')
    process.exit(1)
  }

  try {
    const hashedPassword = await hash(password, 12)

    const admin = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })

    console.log('Admin account created:', admin)
  } catch (error) {
    console.error('Error creating admin account:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
