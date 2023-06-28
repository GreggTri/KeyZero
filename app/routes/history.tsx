import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import HistoryTab from "~/components/HistoryTab"
import { useEffect, useState } from 'react';

export default function AddDocs() {

    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.querySelector('header');
        const height = navbar!.offsetHeight;
        setNavbarHeight(height);
    }, []);

    return (
        <div className='flex h-screen bg-background' style={{ height: `calc(100vh - ${navbarHeight}px)`}}>
            <div className="w-full m-4 bg-white rounded-md shadow-md">
                {/* header */}
                <div className="flex flex-row p-2 md:p-4 text-md md:text-2xl font-medium">
                    <span className="mr-6 md:mr-6">Time/Date</span>
                    <span>Question</span>
                </div>

                {/* body */}
                <div className="mx-2">
                    {/* this is where history component goes */}
                    <HistoryTab/>
                </div>
            </div>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}