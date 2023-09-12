import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";
import { NavLink } from '@remix-run/react'

export default function Login() {

    return (
        <div className='w-screen h-screen p-3 bg-background'>
            <img src="assets/KeyZeroDarkLogo.svg" alt="Logo" className="h-auto w-96"/>

            <form method="post" action="">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" className="rounded-sm shadow-sm w-1/2 my-2" required/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="rounded-sm shadow-sm w-1/2 my-2" required/>

                    <button className="rounded-md shadow-md py-1 bg-primary text-white font-semibold px-2 w-1/4 my-4">Sign In</button>
                    <span>Don't have an account with us yet? <u><NavLink to="/signup">Sign Up Here!</NavLink></u></span>
                </div>
            </form>
            
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    return await authenticator.authenticate("form", request, {
        successRedirect: "/",
        failureRedirect: "/login",
    })
}

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/'
    })
}