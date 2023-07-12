import { prisma } from './prisma.server'
import type { RegisterForm } from './types.server'

export const createOrg = async (user: RegisterForm) => {


    return { }
}

export const getOrg = async (email: String) => {
    
    //stripe email for domain
    const emailDomain = email.split('@')[1]

    const gottenOrg = await prisma.organization.findUnique({
        where: {businessDomain: emailDomain}, 
        select: {
            id: true,
            businessName: true,
            businessDomain: true,

        }
    })
    
    return gottenOrg
}
