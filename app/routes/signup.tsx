import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { register, authenticator } from "~/utils/auth.server";
import { validateEmail, validatePassword } from '~/utils/validators.server'
import { json } from "@remix-run/node";
import { useState } from "react";
import { useActionData } from "react-router";

export default function Signup() {

    const [accountStep, showAccountStep] = useState(false)
    const [createOrgStep, showCreateOrgStep] = useState(true)
    const [joinOrgStep, showJoinOrgStep] = useState(false)
    const [createSubscriptionStep, showCreateSubscriptionStep] = useState(false)


    const handleCreateAccount() {
        showAccountStep(false)

        if(){
            showCreateOrgStep(true)
        } else {
            showJoinOrgStep(true)
        }
    }


    return (
        <div className='w-screen h-screen p-3 bg-background'>
            
            <img src="assets/KeyZeroDarkLogo.svg" alt="Logo" className="h-auto w-96"/>
            
            {/* Create Account */}
            {accountStep ?
            <form method="post" >
                <div className="flex flex-col w-1/4">
                    <label htmlFor="">Company Email</label>
                    <input type="text" className="rounded-sm shadow-sm bg-white"/>
                    <label htmlFor="">Password</label>
                    <input type="text" className="rounded-sm shadow-sm bg-white"/>

                    <button 
                    className="bg-primary rounded-md shadow-md my-4 py-1 px-2" 
                    onClick={e => handleCreateAccount()}
                    >
                        Next
                    </button>
                </div>
            </form>
            :
            null
            }

            {/* Create Organization: if there is not an orginization already set up */}
            {createOrgStep ?
            <form method="post">
                <div className="flex flex-col">
                    <label htmlFor="">Organization's Name</label>
                    <input type="text" className="rounded-sm shadow-sm"/>

                    <label htmlFor="">Organization's Phone Number</label>
                    <input type="text" className="rounded-sm shadow-sm"/>

                    <label htmlFor="">Organization's Email</label>
                    <input type="text" />

                </div>

                <button className="bg-primary rounded-md shadow-md my-4 py-1 px-2">Next</button>
            </form>
            :
            null
            }

            {/* Show Subscriptions: This step is shown after "Create Organization" */}
            {joinOrgStep ?
            <div className="flex ">
                <div>
                    <span>We found your organization from your email.</span>
                    <span></span>
                </div>
                <form method="post">
                    <button >Join Organization</button>
                </form>
            </div>
            
            :
            null
            }
            {/* Show/Join Organization: This step if an organization is already created with their company*/}
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
    const form = await request.formData()

    const formEmail = form.get("email") as string
    const email = formEmail.toLowerCase()
    const password = form.get("password") as string

    // validate the fields
    if (typeof email !== 'string' || typeof password !== 'string') {
        return json({ error: `Invalid Form Data`}, { status: 400 })
      }
    
    const errors = {
        email: validateEmail(email),
        password: validatePassword(password)
    };

    if (Object.values(errors).some(Boolean)) {
        return json({ errors, fields: { email, password}}, { status: 400 })
    }

    
    await register({email, password})

    return await authenticator.authenticate("form", request, {
        successRedirect: "/",
        failureRedirect: "/signup",
    })
}

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/'
    })
}