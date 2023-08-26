import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { register, authenticator } from "~/utils/auth.server";
import { useState } from "react";
import { useActionData } from "@remix-run/react";
import type { createAccountResponse } from "~/utils/types.server";
import { NavLink } from '@remix-run/react'

export default function Signup() {

    const [accountStep, showAccountStep] = useState(true)
    const [createOrgStep, showCreateOrgStep] = useState(false)
    const [joinOrgStep, showJoinOrgStep] = useState(false)
    const [createSubscriptionStep, showCreateSubscriptionStep] = useState(false)

    const [errorState, showErrorState] = useState(false)

    const accountActionData = useActionData<createAccountResponse>();

    const handleCreateAccount = () =>{
        
        
        console.log("this is accouhntActionData: ",  accountActionData);
        if(accountActionData!.success){
            showAccountStep(false)
            showErrorState(false) //incase of 2nd-attempt
            //if create account was successfull we want to figure out what the next step is and go there
            if(accountActionData!.preexistingOrg){
                showCreateOrgStep(true)
            } else {
                showJoinOrgStep(true)
            }

        } else {
            showErrorState(true)
        }

        
    }

    const handleCreateOrg = () =>{

        showCreateOrgStep(false)
        showCreateSubscriptionStep(true)
    }

    //TODO: We want to make one big form essentially. this will take in all the data from 
    //  every screen in the registration flow. and then create Org, then user that is in that org.
    //We can do a quick check from when they enter their email to check if org exists or not.
    //then if not exist then send screen to get Org details. 

    //or just look at this. maybe this is what I mean. idk. but definitely need to do something like this
    // https://sergiodxa.com/articles/add-additional-data-before-submitting-on-remix
    return (

        
        <div className='w-screen h-screen p-3 bg-background'>
            
            <img src="assets/KeyZeroDarkLogo.svg" alt="Logo" className="h-auto w-96"/>
            
            {/* Create Account */}
            {accountStep ?
            <form id="createAccountForm" method="post" action="/signup" >
                <div className="flex flex-col w-1/4">
                    <input 
                    type="hidden"
                    id="actionType" 
                    name="actionType" 
                    defaultValue="CREATE_ACCOUNT"
                    />
                    <label htmlFor="">Company Email</label>
                    <input id="email" name="email" type="email" className="rounded-sm shadow-sm bg-white" required/>
                    <label htmlFor="">Password</label>
                    <input id="password" name="password" type="password" className="rounded-sm shadow-sm bg-white" required />

                    <button 
                    className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold" 
                    onClick={e => handleCreateAccount()}
                    >
                        Next
                    </button>
                    {errorState ?
                    <span className="font-semibold text-red-600">{accountActionData!.error}</span>
                    :
                    null
                    }
                    <span>Have an account already? <u><NavLink to="/login">Sign In Here!</NavLink></u></span>
                </div>
            </form>
            :
            null
            }

            {/* Create Organization: if there is not an orginization already set up */}
            {createOrgStep ?
            <form method="post" action="/signup">
                <div className="flex flex-col">
                    <input 
                    type="hidden"
                    id="actionType" 
                    name="actionType" 
                    defaultValue="CREATE_ORG"
                    />
                    <label htmlFor="">Organization's Name</label>
                    <input id="orgName" type="text" className="rounded-sm shadow-sm"/>

                    <label htmlFor="">Organization's Phone Number</label>
                    <input id="orgPhoneNumber" type="text" className="rounded-sm shadow-sm"/>

                    <label htmlFor="">Organization's Email</label>
                    <input id="orgEmail" type="text" />

                </div>

                <button 
                className="bg-primary rounded-md shadow-md my-4 py-1 px-2"
                onClick={e => handleCreateOrg()}
                >
                    Next
                </button>
            </form>
            :
            null
            }

             {/* Show/Join Organization: This step if an organization is already created with their company*/}
            {joinOrgStep ?
            <div className="flex ">
                <div> 
                    <span>We found your organization from your email.</span>
                    <span><b>Organization's Domain:</b> Spinsci.com</span>
                </div>
                <form method="post" action="/signup">
                    <input 
                    type="hidden"
                    id="actionType" 
                    name="actionType" 
                    defaultValue="JOIN_ORG"
                    />
                    <button type="submit" className="bg-primary rounded-md shadow-md my-4 py-1 px-2">Join Organization</button>
                </form>
            </div>
            
            :
            null
            }
           
            {/* Show Subscriptions: This step is shown after "Create Organization" */}
            {/* THis will most likely be a redirect to stripe hosted subscription thing.  */}
            {createSubscriptionStep ?
            <form method="post">
                <div className="flex flex-col">

                </div>

                <button>Start Subscription</button>
            </form>
            :
            null
            }
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
    //TODO:: figure out what response is and whatever success is, have it continue.     
    //whatever means it is not, then redirect
    
    //after JOIN_ORG case, it should authenticate the user and send them to index
    //after CREATE_SUBSCRIPTION case, it should send to index

    // const response = await authenticator.authenticate("form", request, {
    //     successRedirect: "/",
    //     failureRedirect: "/signup",
    // })

    
    
    const formData = await request.formData();
    console.log(formData);

    const formAction = formData.get('actionType') as string

    console.log(formAction);

    switch(formAction){
        case 'CREATE_ACCOUNT':
            const formEmail = formData.get("email") as string
            const email = formEmail.toLowerCase()

            console.log(email);
            const password = formData.get("password") as string

            return await register({email, password})
        case 'CREATE_ORG':
            return "blah"
        case 'JOIN_ORG':
            return "blah"
        case 'CREATE_SUBSCRIPTION':
            return "blah"
        default: 
            return new Error("No action was specified");
    }
}

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/'
    })
}