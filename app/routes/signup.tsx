import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { register, authenticator } from "~/utils/auth.server";
import { useState } from "react";
import { useActionData } from "@remix-run/react";
import type { createAccountResponse } from "~/utils/types.server";

import { useMultistepForm } from "~/hooks/useMultistepForm";
import { CreateAccountForm } from "~/components/createAccountForm";
import { OrganizationStep } from "~/components/OrganizationStep";


export default function Signup() {  

    const { steps, currentStepIndex, step, isFirstStep, isLastStep,  back, next } = useMultistepForm([
        <CreateAccountForm key={0} />,
        <OrganizationStep key={1} />
    ])

    const handleAccountNextStep = async (isFirstStep: Boolean) => {
        if(isFirstStep){
            return true
        }
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
            
            <form action="" className="">
                <div className="absolute top-2 right-2">
                {currentStepIndex + 1}/ {steps.length}
                </div>
                {step}

                <div className="flex mt-3 gap-2 justify-end">
                    {/* Back Button */}
                    {!isFirstStep && 
                    <button
                    className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold"
                    type="button" 
                    onClick={back}>
                        Back
                    </button>}

                    {/* Next Button : Finish Sign Up button */}
                    {!isLastStep ?
                    <button
                    className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold" 
                    type="button" 
                    onClick={next}>
                        Next
                    </button>
                    :
                    <button
                    className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold"
                    type="submit"
                    >
                        Finish Signing Up
                    </button>
                    }
                </div>

            </form>
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