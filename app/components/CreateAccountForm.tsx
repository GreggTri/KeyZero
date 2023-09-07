import { useState, useEffect } from "react"
import { NavLink } from "@remix-run/react";

//figure out props for errorState and accountActionData error 
export function CreateAccountForm({ sendDataToParent }: { sendDataToParent: (data: string) => void }) {

    const [inputData, setInputData] = useState('')


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    }

    useEffect(() => {
        sendDataToParent(inputData);
    }, [sendDataToParent, inputData])


    return (
        <>
            <label>Company Email</label>
            <input 
            id="email" 
            name="email" 
            type="email"
            value={inputData}
            onChange={e => handleInputChange(e)}
            className="rounded-sm shadow-sm bg-white" 
            required
            />
            
            <label>Password</label>
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