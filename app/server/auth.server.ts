import { json }  from "@remix-run/node"
import { prisma } from "../utils/prisma.server"
import type { RegisterForm} from "../utils/types.server"
import { createUser } from "./users.server"
import { getOrg } from "./organizations.server"
import bcrypt from "bcryptjs"
import { Authenticator, AuthorizationError } from "remix-auth"
import { sessionStorage } from "../utils/session.server"
import { FormStrategy } from "remix-auth-form"
import { validateEmail, validatePassword } from '~/utils/validators.server'

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
    const uncasedEmail: String = form.email

    const email = uncasedEmail.toLowerCase()
    const password: String = form.password
    
    try{

        // const exists = await prisma.user.count({where: {email: email}});
        // if ( exists ){
        //     return json(
        //         {error: "User already exists with this email"},
        //         {status: 400}
        //     )
        // }
        
        // validate the fields
        if (typeof email !== 'string' || typeof password !== 'string') {
            return json({ error: `Invalid Form Data`}, { status: 400 })
        }
        
        const errors = {
            email: validateEmail(email),
            password: validatePassword(password)
        };

        if (Object.values(errors).some(Boolean)) {
            return json({
                success: false, 
                error: errors, 
                fields: { email, password}
            }, {status: 400})
        }

        const organizationDomain = email.split('@')[1];

        const newUser = await createUser({email, password, organizationDomain})

        if(!newUser){
            return json({
                success: false,
                error: "Something went wrong trying to create your account",
                fields: {email: email, password: password}
            }, {status: 500})
        }
        

        if(!newUser.businessDomain){
            return json({
                success: true,
                userId: newUser.id,
                userEmail: newUser.email,
                orgExists: false,
            }, {status: 201})
        }

        return json({
            success: true,
            userId: newUser.id,
            userEmail: newUser.email,
            orgExists: true,
            orgName: newUser.businessName,
            orgDomain: newUser.businessDomain 
        }, {status: 201});

    } catch(error){
        return json({success: false, error: error}, {status: 500})
    }
}