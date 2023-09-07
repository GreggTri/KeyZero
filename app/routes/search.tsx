import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";
import { useActionData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { search } from "~/server/search.server";

export default function Search() {

    const [navbarHeight, setNavbarHeight] = useState(0);
    
    useEffect(() => {
        const navbar = document.querySelector('header');
        const height = navbar!.offsetHeight;
        setNavbarHeight(height);
    }, []);

    //this should be destructered
    const response = useActionData<typeof action>();

    return (
        <div className='flex flex-col items-center h-screen p-3 bg-background' style={{ height: `calc(100vh - ${navbarHeight}px)`}}>
            <h1 className="text-2xl my-14">Ask a question against your companies documentation</h1>
            {/* <div className="flex flex-row w-full px-1 bg-white rounded-md shadow-md">
                <form method="post" action="" className="flex flex-row items-center w-full">
                    <img src="assets/searchIcon.svg" alt="SearchIcon" className="w-full h-4" />
                    <input type="search" className="py-2 pl-1 mr-2 text-sm text-white focus:outline-none focus:text-gray-900" placeholder="Ask a Question..." required/>
                </form>
            </div> */}
            
            <form method="POST" className="flex items-center w-3/4 md:w-1/2 lg:w-1/3">   
                <input 
                    type="hidden"
                    id="actionType" 
                    name="actionType" 
                    defaultValue="SEARCH"
                />
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-black dark:text-black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg>
                    </div>
                    <input id="query" name="query" type="search" className="bg-white text-gray-900 text-sm rounded-md shadow-md focus:outline-none block w-full pl-10 p-2.5" placeholder="Ask a Question..." required/>
                </div>
            </form>

            
            {
            response ?
            <div className="flex flex-col w-full bg-white rounded-md shadow-md md:w-4/6 my-14">
                <div className="flex flex-row justify-between">
                    <h2 className="p-4 font-medium text-md">Answer</h2>
                    {/* I think we wait till after launch to add feedback. just get everything done first */}
                    {/* <div className="p-4 text-sm">
                        <span className="px-2 py-1 mx-2 text-green-600 bg-green-200 rounded">Good</span>
                        <span className="px-2 py-1 mx-2 text-red-600 bg-red-200 rounded">Bad</span>
                    </div> */}
                </div>
                <p className="px-6 py-4 text-sm">
                    {response.answer}
                </p>
            </div>
            :
            null
            }
            
        </div>
    );
}

//TODO: CHECK IF THIS WORKS NOW WITH SESSION STUFF
export const action: ActionFunction = async ({request}: ActionArgs) => {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    console.log(session);
    const userData = session.get('_session');
    console.log(userData);
    const userId = userData.get('id');
    console.log(userId);

    const formData = await request.formData();
    const formAction = formData.get('actionType') as string

    switch(formAction){
        case 'SEARCH':
            const query = formData.get("query") as string
            console.log("this is query",query);
            const response = await search(userId, query)
            console.log(response);
            //this should be destructered
            return response
        default: 
            return new Error("No action was specified");
    }
} 

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: '/login'
    })
}