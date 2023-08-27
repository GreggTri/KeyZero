import { NavLink } from "@remix-run/react"

//figure out props for errorState and accountActionData error 
export function CreateAccountForm() {
    return (
        <>
            <label htmlFor="">Company Email</label>
            <input id="email" name="email" type="email" className="rounded-sm shadow-sm bg-white" required/>
            
            <label htmlFor="">Password</label>
            <input id="password" name="password" type="password" className="rounded-sm shadow-sm bg-white" required />
           {/* { {errorState ?
            <span className="font-semibold text-red-600">{accountActionData!.error}</span>
            :
            null
            }} */}
            <span>Have an account already? <u><NavLink to="/login">Sign In Here!</NavLink></u></span>
        </>
    )
}