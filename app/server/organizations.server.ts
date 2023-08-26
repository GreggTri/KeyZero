import { prisma } from '../utils/prisma.server'
import type { RegisterForm } from '../utils/types.server'

export const createOrg = async (user: RegisterForm) => {


    return { }
}

export const getOrg = async (email: string) => {
    
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

export const getOrgDocs = async (org: string) => {
    
    const Org = await prisma.organization.findUnique({
        where: {id: org}, 
        select: {
            id: true,
            businessName: true,
            businessDomain: true,
            documentSpaces: true
        }
    })

    return Org
}