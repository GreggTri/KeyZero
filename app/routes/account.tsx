import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useEffect, useState } from 'react';
import { NavLink } from '@remix-run/react'

export default function AddDocs() {

    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.querySelector('header');
        const height = navbar!.offsetHeight;
        setNavbarHeight(height);
    }, []);

    const [generalState, setGeneral] = useState(true)
    const [orgState, setOrg] = useState(false)
    const [settingsState, setSettings] = useState(false)

    return (
        <div className='flex flex-row h-screen bg-background overflow-y-auto' style={{ height: `calc(100vh - ${navbarHeight}px)`}}>
            {/* Side Settings Nav */}
            <div className=" bg-white w-36 h-full items-start" >
                <div className="flex flex-col ml-4 pt-4">
                    <span 
                    className="my-1"
                    onClick={e => {
                        setOrg(false)
                        setSettings(false)
                        setGeneral(true)
                    }}
                    >
                        General
                    </span>
                    <span 
                    className="my-1"
                    onClick={e => {
                        
                        setSettings(false)
                        setGeneral(false)
                        setOrg(true)
                    }}
                    >
                        Organization
                    </span>
                    <span 
                    className="my-1"
                    onClick={e => {
                        
                        
                        setGeneral(false)
                        setOrg(false)
                        setSettings(true)
                    }}
                    >
                        Settings
                    </span>
                    <NavLink to="/logout" className="my-16 text-red-600"><u>Logout</u></NavLink>
                </div>
            </div>

            {/* Body */}
            <div className="flex">

                {/* General Page */}
                {generalState ?
                <div>
                    General
                </div>
                :
                null   
                }
                
                {/* Organization Page */}
                {orgState ?
                <div>
                    Organization
                </div>
                :
                null
                }

                {/* Settings Page */}
                {settingsState ?
                <div>
                    Settings
                </div>
                :
                null  
                }           
            </div>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}