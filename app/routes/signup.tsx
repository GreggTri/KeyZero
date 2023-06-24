import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { register, authenticator } from "~/utils/auth.server";
import { validateEmail, validatePassword } from '~/utils/validators.server'
import { json } from "@remix-run/node";

export default function Signup() {

    return (
        <div className='w-screen h-screen p-3 bg-red-600'>
            <h1>SignUp</h1>
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
    console.log(request);
    return await authenticator.isAuthenticated(request, {
        failureRedirect: '/signup'
    })
}