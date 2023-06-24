import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import type { AuthorizationError } from "remix-auth"

export default function Login() {

    return (
        <div className='w-screen h-screen p-3 bg-red-600'>
            <h1>Login</h1>
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
    console.log(request);
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/'
    })
}