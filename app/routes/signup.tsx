import { type LoaderFunction, type LoaderArgs, type ActionFunction, type ActionArgs, json } from "@remix-run/node";
import { useActionData } from '@remix-run/react';
import { useNavigation } from "@remix-run/react";
import { register, authenticator } from "~/server/auth.server";
import { getOrg } from "~/server/organizations.server";
import { useState, useEffect } from "react";
import { useMultistepForm } from "~/hooks/useMultistepForm";
import { CreateAccountForm } from "~/components/CreateAccountForm";
import { OrganizationStep } from "~/components/OrganizationStep";


export default function Signup() {  

    const [OrgExist, setOrgExist] = useState(false)
    const [OrgName, setOrgName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    let transition = useNavigation()

    const actionData = useActionData();

    const getUserEmail = (userEmail: string) => {
        setInputEmail(userEmail)
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep,  back, next } = useMultistepForm([
        <CreateAccountForm key={0} sendDataToParent={getUserEmail}/>,
        <OrganizationStep key={1} OrgExists={OrgExist} OrgName={OrgName}/>
    ])

    const handleNextStep = async () => {
        if(isFirstStep){
            
            step.props.sendDataToParent(getUserEmail)
            
            const formData = new FormData();
            formData.append('email', inputEmail);
            formData.append('actionType', 'CheckOrgExistence');

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    body: formData
                });
    
                if (response.ok) {
                    // console.log("this is response", response);
                    // const checkOrg = await response.form();
                    // console.log(checkOrg);
                    // // Handle checkOrg as needed
                    console.log(actionData);
                } else {
                    console.error("Fetch error:", response.statusText);
                    // Handle error response here
                }
            } catch (error) {
                console.error("Fetch error:", error);
                // Handle other fetch errors here
            }
            
            // if (response.orgExists){
            //     setOrgExist(false)
                
            // } else {
            //     setOrgExist(true)
            //     setOrgName(response.businessName)
            // }
        }
        console.log("action data in handler",actionData);
        next()
    }

    useEffect(() => {
        if (transition.state === "loading" || transition.state === "submitting") {
            console.log(actionData);
            if(actionData){
                setOrgExist(true)
                setOrgName(actionData.businessName)
            } else {
                setOrgExist(false)
            }
        }
    }, [transition, actionData])

    return (

        
        <div className='w-screen h-screen p-3 bg-background'>
            
            <img src="assets/KeyZeroDarkLogo.svg" alt="Logo" className="h-auto w-96"/>
            
            <form action="" className="">
                <div className="absolute top-2 right-2">
                {currentStepIndex + 1}/ {steps.length}
                </div>
                
                {/* Forms */}
                {step}
                {(transition.state === "loading" || transition.state === "submitting") && <h1 className="text-red">Loading...</h1>}
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
                    onClick={e => handleNextStep()}>
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
    
    //after JOIN_ORG case, it should authenticate the user and send them to index
    //after CREATE_SUBSCRIPTION case, it should send to index
    console.log("hi");
    const formData = await request.formData();
    
    const formAction = formData.get('actionType') as string

    switch(formAction){
        case 'CheckOrgExistence':
            const emailToCheck = formData.get('email') as string
            const emailOrg = emailToCheck.toLowerCase()

            //const checkOrgResponse = await getOrg(emailOrg)

            //console.log(checkOrgResponse);

            const checkOrgResponse = {
                id: "091247104909had",
                businessName: "rexly",
                businessDomain: "rexly.co"
            }
            return json(checkOrgResponse)

        //This is for when we have all the information we need and we go ahead and create user/everything else that needs to be done
        default:

            const formEmail = formData.get("email") as string
            const email = formEmail.toLowerCase()

            console.log(email);
            const password = formData.get("password") as string
            const registerResponse = await register({email, password})

            //TODO:: figure out the rest of the signup actions that need to be done

            return registerResponse
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