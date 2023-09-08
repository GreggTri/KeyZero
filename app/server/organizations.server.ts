import { prisma } from '../utils/prisma.server'

export const createOrg = async (orgName: string, orgWebsite: string, orgEIN: string, orgAccountRep: string, orgAccountRepEmail: string) => {

    const newOrg = await prisma.organization.create({
        data: {
            businessName: orgName,
            businessDomain: orgWebsite,
            EIN: orgEIN,
            accountRepresentatives: { 
                userId: orgAccountRep,
                userEmail: orgAccountRepEmail
            }
        }
    })

    console.log(newOrg);

    if(newOrg){
        const user = await prisma.user.update({
            where: {id: orgAccountRep},
            data: {
                organization: newOrg.id
            }
        })

        console.log(user.organization);
    }

    return newOrg
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

export const createOrgJoinRequest = async (userId: string, orgDomain: string) => {

    try{
        const orgJoinRequested = await prisma.organization.update({
            where: {businessDomain: orgDomain},
            data: {
                joinRequests: {
                    push: {
                        userId: userId
                    }
                }
            }
        })
    
        console.log(orgJoinRequested);
        return orgJoinRequested

    } catch(error){
        console.log(error);

        return error
    }
    

    
}

//TODO:: Finish
export const acceptOrgJoinRequest = async (userId: string, orgId: string) => {
    try {
        const acceptedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                organization: orgId
            }
        })
        
        //need to figure out how to find specific userId inside of JoinRequests and them remove from organization
        const delJoinRequest = await prisma.organization.update({
            where: {id: orgId},
            data: {

            }
        })

    } catch(error){
        console.log(error);
    }
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