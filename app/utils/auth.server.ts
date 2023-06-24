import { json }  from "@remix-run/node"
import { prisma } from "./prisma.server"
import type { RegisterForm} from "./types.server"
import { createUser } from "./users.server"
import bcrypt from "bcryptjs"
import { Authenticator, AuthorizationError } from "remix-auth"
import { sessionStorage } from "./session.server"
import { FormStrategy } from "remix-auth-form"

const authenticator = new Authenticator<any>(sessionStorage)

const formStrategy = new FormStrategy(async ({form}) => {
    const formEmail = form.get("email") as string
    const email = formEmail.toLowerCase()
    const password = form.get("password") as string

    try{
        const user = await prisma.user.findUnique({where: {email: email}})


        // validate the fields
        if (typeof email !== "string" || !email.includes("@")) {
            throw new AuthorizationError("Your email or password is incorrect")
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new AuthorizationError("Your email or password is incorrect")
        }

        
        if(!user){
            throw new AuthorizationError("Your email or password is incorrect")
        }

        if(!(await bcrypt.compare(password, user.password))){
            throw new AuthorizationError("Your email or password is incorrect")
        }
        const authUser = {
            id: user.id,
            email: user.email
        }

        return authUser
    }catch(error){
        throw new AuthorizationError(`${error}`)
    }
})

authenticator.use(formStrategy, "form")
export { authenticator }

export const register = async (form: RegisterForm) => {
    const email = form.email
    const password = form.password

    try{

        // const exists = await prisma.user.count({where: {email: email}});
        // if ( exists ){
        //     return json(
        //         {error: "User already exists with this email"},
        //         {status: 400}
        //     )
        // }

        const newUser = await createUser({email, password})

        if(!newUser){
            return json({
                error: "Something went wrong trying to create your account",
                fields: {email: email, password: password}
            }, {
                status: 500
            })
        }

        return json({success: true}, {status: 201});

    } catch(error){
        return json({error: error}, {status: 500})
    }
}