import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import type { AuthorizationError } from "remix-auth"

export default function Login() {

    return (
        <div className='w-screen h-screen p-3 bg-background'>
            <img src="assets/KeyZeroDarkLogo.svg" alt="Logo" className="h-auto w-96"/>

            <form method="post" action="">
                <div className="flex flex-col">
                    <label htmlFor="">Email</label>
                    <input type="text" className="rounded-sm shadow-sm w-1/2 my-2"/>
                    <label htmlFor="">Password</label>
                    <input type="text" className="rounded-sm shadow-sm w-1/2 my-2"/>
                    <button className="rounded-md shadow-md py-1 bg-primary text-white px-2 w-1/4 my-4">Sign In</button>
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