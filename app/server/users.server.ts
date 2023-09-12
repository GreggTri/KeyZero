import { prisma } from '../utils/prisma.server'
import type { AuthUserAndOrg } from '../utils/types.server'
import bcrypt from "bcryptjs"

export const createUser = async (user: AuthUserAndOrg) => {
    const passwordHash = await bcrypt.hash(user.password, 10) //hashing password
    
    //WHAT: we want to check to see if org from users email already exists. 
    //WHY: this is so we can allow user to make a join request later
    const organization = await prisma.organization.findUnique({
        where: {businessDomain: user.organizationDomain},
        select: {
            id: true,
            businessName: true,
            businessDomain: true
        }
    });

    //Here we create the new user
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash
        }
    });

    //WHAT: Sending back the new user and information of the org
    //WHY: to start authflow and to allow user to make a join request to the org
    return { 
        id: newUser.id, 
        email: newUser.email,
        businessName: organization?.businessName || null,
        businessDomain: organization?.businessDomain || null
    }
}

export const getUser = async (userId: string) => {

    const gottenUser = await prisma.user.findUnique({
        where: {id: userId}, 
        select: {
            id: true,
            email: true,
            password: false, //not selected
        }
    });

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
    });

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
    });

    if (!questionHistory){
        return null
    }

    return questionHistory
}

