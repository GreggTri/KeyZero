import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";
import { useEffect, useState } from 'react';
import { NavLink } from '@remix-run/react'

export default function AddDocs() {

    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.querySelector('header');
        const height = navbar!.offsetHeight;
        setNavbarHeight(height);
    }, []);

    const [settingsState, setSettings] = useState(true)
    const [orgState, setOrg] = useState(false)
    const [billingState, setBilling] = useState(false)
    

    return (
        <div className='flex flex-row h-screen bg-background overflow-y-auto' style={{ height: `calc(100vh - ${navbarHeight}px)`}}>
            {/* Side Settings Nav */}
            <div className=" bg-white w-36 h-full items-start cursor-pointer" >
                <div className="flex flex-col ml-4 pt-4">
                    <span 
                    className="my-1"
                    onClick={e => {
                        setOrg(false)
                        setBilling(false)
                        setSettings(true)
                    }}
                    >
                        {settingsState ? <span><u>Settings</u></span> : <span>Settings</span>  }
                    </span>
                    <span 
                    className="my-1"
                    onClick={e => {
                        
                        setSettings(false)
                        setBilling(false)
                        setSettings(false)
                        setOrg(true)
                    }}
                    >
                        {orgState ? <span><u>Organization</u></span> : <span>Organization</span>  }
                    </span>
                    <span 
                    className="my-1"
                    onClick={e => {
                        
                        setSettings(false)
                        setSettings(false)
                        setOrg(false)
                        setBilling(true)
                    }}
                    >
                        {billingState ? <span><u>Billing</u></span> : <span>Billing</span>  }
                    </span>
                    <NavLink to="/logout" className="my-16 text-red-600"><u>Logout</u></NavLink>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col m-4 w-full bg-white rounded-md items-center">

                {/* Account Page */}
                {settingsState ?
                <>
                    <span className="text-lg md:text-2xl font-bold ">
                        Account Settings
                    </span>
                    
                    <div className="flex flex-col item-center my-8">
                        <span></span>
                        <button className=" items-center px-3 py-1 bg-red-600 text-white rounded-md my-2">Delete Account</button>
                    </div>
                </>
                    
                    
                :
                null   
                }
                
                {/* Organization Page */}
                {orgState ?
                <>
                    <span className="text-md font-bold">
                        Organization Settings
                    </span>

                    {
                        <form method="post" action="" className="flex flex-col mt-2 my-2 ">
                            <label htmlFor="orgInput">
                                Organization Name
                            </label>
                            <input type="text" name="orgInput" className="flex rounded-md border-black border border-solid"/>
                            <span className="my-4">
                                By creating an organization your account will be made the representative of the org.
                            </span>

                            <button className=" px-3 py-1 bg-primary text-white rounded-md my-2">Create Organization</button>
                            
                        </form>
                    }
                </>
                :
                null
                }
                
                {/* Billing */}
                {billingState ?
                <>
                    <span className="text-md font-bold">
                        Billing
                    </span>
                </>
                :
                null
                }      
            </div>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}