import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import HistoryTab from "~/components/HistoryTab"
import { useEffect, useState } from 'react';
import { useLoaderData } from "@remix-run/react";
import { getHistory } from "~/server/users.server";

export default function AddDocs() {

    const [navbarHeight, setNavbarHeight] = useState(0);

    const { success, messageHistory, error  } = useLoaderData();

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
                    {/* this is where history component goes... Add props to historyTab*/}
                    <HistoryTab/>
                </div>
            </div>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    const authResponse = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login'
    })

    
    //TODO:: check what auth response is when isAuthenticated is true or false and make if statements
    //so we know whether or not we should return authResponse to redirect or not. 
    console.log(authResponse);
    //also see if userId is somewhere there and grab it

    const messageHistory = await getHistory(authResponse.request.body.userId)

    if(!messageHistory){
        return "some JSON response with success as false and error message"
    }

    //TODO:: make some json response with success as true and then data
    return messageHistory

}