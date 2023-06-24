import { prisma } from './prisma.server'
import type { RegisterForm } from './types.server'
import bcrypt from "bcryptjs"

export const createUser = async (user: RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash
        }
    })

    return { id: newUser.id, email: newUser.email}
}

export const getUser = async (userId: string) => {

    const gottenUser = await prisma.user.findUnique({
        where: {id: userId}, 
        select: {
            id: true,
            email: true,
            password: false, //not selected
            firstName: true,
            lastName: true,
            netIncome: true,
            setCalories: false, //not selected
            budgetCategories: true,
            

        }
    })

    return gottenUser
}

