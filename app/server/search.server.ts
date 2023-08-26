import { prisma } from '../utils/prisma.server'
import { fetch } from '@remix-run/node';
import { getUserRoleAndOrg } from './users.server';
import { getOrgDocs } from './organizations.server';


export const search = async (userId: string, query: string) => {
    
    //1: grab orgainzation and role from user
    const user = await getUserRoleAndOrg(userId)

    if(!user){
        return "wtf"
    }

    //2: search org for documentspace related to the potential role of user
    const orgDocs = await getOrgDocs(user.organization) //TODO:: update prisma schema to fix. change already made

    //3: search space in pinecone with query from user
    //4: return openAI response with metadata that shows where in doc the info came from
    // to come up with that response

    //send request to fastAPI server to handle search completes 3 and 4
    const response = await fetch(`${process.env.SEARCH_SERVICE}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            //add API_KEY here so that search service only accepts calls from main service
          },
        body: JSON.stringify({
            userQuery: query,
            organization: {...orgDocs}
        })
    })

    //probably somethings need to be done here to figure out what we want to do 
    //with response from search service

    //like logging response and storing in db 
    return response
}