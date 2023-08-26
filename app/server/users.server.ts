import { prisma } from '../utils/prisma.server'
import type { AuthUserAndOrg } from '../utils/types.server'
import bcrypt from "bcryptjs"

//TODO:: add way to add organization Id here. so, Org must be created before user is created.
export const createUser = async (user: AuthUserAndOrg) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    
    const organization = await prisma.organization.findUnique({
        where: {businessDomain: user.organizationDomain},
        select: {
            id: true
        }
    })
    
    //TODO:: return 400 and tell user that organization does not exist
    //if they get inside here, it means they are trying to join an org not create one because org
    //should already be created otherwise
    if(!organization){
        return "who the fuck are you"
    }

    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash,
            organization: organization.id
        }
    })

    return { id: newUser.id, email: newUser.email, organization: newUser.organization}
}

export const getUser = async (userId: string) => {

    const gottenUser = await prisma.user.findUnique({
        where: {id: userId}, 
        select: {
            id: true,
            email: true,
            password: false, //not selected
        }
    })

    return gottenUser
}

export const getUserRoleAndOrg = async (userId: string) => {

    const user = await prisma.user.findUnique({
        where: {id: userId}, 
        select: {
            id: true,
            email: true,
            role: true,
            organization: true,
            password: false, //not selected
        }
    })

    return user
}

export const getHistory = async (userId: string) => {

    const questionHistory = await prisma.message.findMany({
        where: {userId: userId},
        select: {
            id: true,
            message: true,
            //add feedback when feature is created
            createdAt: true,
        }
    })

    if (!questionHistory){
        return "fuck"
    }

    return questionHistory
}

