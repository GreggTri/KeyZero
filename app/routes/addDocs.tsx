import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";

import { useEffect, useState } from 'react';

export default function AddDocs() {

    const [navbarHeight, setNavbarHeight] = useState(0);
    
    useEffect(() => {
        const navbar = document.querySelector('header');
        const height = navbar!.offsetHeight;
        setNavbarHeight(height);
    }, []);

    return (
        <div className='flex flex-col items-center h-screen p-3 bg-background' style={{ height: `calc(100vh - ${navbarHeight}px)`}}>
            <h1 className="flex my-16 text-2xl font-medium">Insert a folder with your companies documents inside</h1>
            <button className="my-4">
                <img src="assets/squarePlusAdd.svg" alt="AddFolder" />
            </button>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: '/login'
    })
}