import { json }  from "@remix-run/node"
import { prisma } from "./prisma.server"
import type { RegisterForm} from "./types.server"
import { createUser } from "../server/users.server"
import { getOrg } from "../server/organizations.server"
import bcrypt from "bcryptjs"
import { Authenticator, AuthorizationError } from "remix-auth"
import { sessionStorage } from "./session.server"
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
    const email: String = form.email
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
        
        //TODO:: make a query call that checks if a organization exists in DB with that domain.
        //if false just return false
        //if true return true and the name of the org.
        const org = await getOrg(email)

        if(!org){
            return json({
                success: true,
                orgExists: false,
            }, {status: 201})
        }

        return json({
            success: true,
            orgExists: true,
            orgName: org.businessName,
            orgDomain: org.businessDomain 
        }, {status: 201});

    } catch(error){
        return json({success: false, error: error}, {status: 500})
    }
}