import { type LoaderFunction, type LoaderArgs, type ActionFunction, type ActionArgs, redirect } from "@remix-run/node";
import { useActionData, useFetcher } from '@remix-run/react';
import { useNavigation } from "@remix-run/react";
import { useState, useEffect } from "react";
import { NavLink } from "@remix-run/react";

import { authenticator, register } from "~/server/auth.server";
import { createOrg, createOrgJoinRequest } from "~/server/organizations.server";


export default function Signup() {  

    const [startSubscription, setStartSubscription] = useState(false)

    const actionData = useActionData()

    const [accountData, setAccountData] = useState({
        success: false,
        userId: "",
        userEmail: "",
        orgExists: false,
        orgName: "",
        orgDomain: ""
    })
    const [joinOrgData, setJoinOrgData] = useState({
        success: false,
    })

    const [orgData, setOrgData] = useState({
        success: false
    })

    let accountFetcher = useFetcher()
    let joinOrgFetcher = useFetcher()
    let createOrgFetcher = useFetcher()

    useEffect(() => {
        if(actionData?.success){

            console.log(accountFetcher.formAction);

            // if(!accountData.success){
                setAccountData({...actionData})
        }

    }, [actionData, accountFetcher])


    return (
        <div className='w-screen h-screen p-3 bg-background'>
            
            <img src="assets/KeyZeroDarkLogo.svg" alt="Logo" className="h-auto w-96"/>
            
            
            {!accountData.success && <accountFetcher.Form reloadDocument method="post">
                <label htmlFor="email" >Company Email</label>
                <input 
                id="email" 
                name="email" 
                type="email"
                className="rounded-sm shadow-sm bg-white" 
                required
                />
                
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="rounded-sm shadow-sm bg-white" required />
                {/* { {errorState ?
                <span className="font-semibold text-red-600">{accountActionData!.error}</span>
                :
                null
                }} */}
                <span>Have an account already? <u><NavLink to="/login">Sign In Here!</NavLink></u></span>

                <button
                className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold"
                type="submit"
                name="_action"
                value="createAccount"
                >
                    Next
                </button>
            </accountFetcher.Form>
            }
            
            {(accountData.success && !accountData.orgExists) && 
            <createOrgFetcher.Form reloadDocument method="post">
                <label htmlFor="orgNameForm">Organization's Name</label>
                <input name="orgNameForm" type="text" className="rounded-sm shadow-sm"/>

                <label htmlFor="orgDomainForm">Organization's Website (Must match your email)</label>
                <input name="orgDomainForm" type="text" className="rounded-sm shadow-sm"/>

                <label htmlFor="orgEINForm">Organization's EIN</label>
                <input name="orgEINForm" type="text" />

                <input type="hidden" name="userIdOrgForm" value={accountData.userId} />
                <input type="hidden" name="userEmailOrgForm" value={accountData.userEmail} />

                <button
                className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold"
                type="submit"
                name="_action"
                value="createOrg"
                >
                    Create Organization
                </button>
            </createOrgFetcher.Form>
            }

            {(accountData.success && accountData.orgExists) && 
            <joinOrgFetcher.Form onSubmit={e => redirect('/login')}  method="post">
                <div> 
                    <span>We found your organization from your email.</span>
                    <span><b>Organization's Domain:</b>{actionData?.orgDomain}</span>
                </div>

                <input type="hidden" name="userId" value={accountData.userId} />
                <input type="hidden" name="orgDomain" value={accountData.orgDomain} />
                <button
                className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold"
                type="submit"
                name="_action"
                value="joinOrg"
                >
                    Join Organization
                </button>
            </joinOrgFetcher.Form>
            }

            
            
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
    //after JOIN_ORG case, it should authenticate the user and send them to index
    //after CREATE_SUBSCRIPTION case, it should send to index
    const formData = await request.formData();

    const formAction = formData.get('_action') as string

    switch(formAction){
        case 'createAccount':
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            
            const registerResponse = await register({email, password})
            return registerResponse

        case 'joinOrg':
            
            const userId = formData.get('userId') as string;
            const orgDomain = formData.get('orgDomain') as string

            const joinOrgResponse = await createOrgJoinRequest(userId, orgDomain)

            return joinOrgResponse

        case 'createOrg':
            const orgName = formData.get('orgNameForm') as string
            const orgWebsite = formData.get('orgDomainForm') as string
            const orgEIN = formData.get('orgEINForm') as string
            const orgAccountRep = formData.get('userIdOrgForm') as string
            const orgAccountRepEmail = formData.get('userEmailOrgForm') as string


            if(orgWebsite !== orgAccountRepEmail.split('@')[1]){
                return "Your Companys domain does not match your emails domain"
            }

            const createOrgResponse = await createOrg(orgName, orgWebsite, orgEIN, orgAccountRep, orgAccountRepEmail)

            return createOrgResponse
            
        case 'startSubscription':
            return 'uhhh'
        default: 
            return "No Action has been selected"
    }
}

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    
    const isInitialLoad = request.headers.get('Accept') === 'text/html'

    if (isInitialLoad){
        return await authenticator.isAuthenticated(request, {
            successRedirect: '/'
        })
    } else {
        return "not initial load"
    }
       
}
