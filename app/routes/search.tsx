import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useActionData } from "@remix-run/react";
import { useState } from "react";

export default function Search() {

    const response = useActionData<typeof action>();

    return (
        <div className='flex flex-col items-center h-screen p-3 bg-background'>
            <h1 className="text-2xl my-14">Ask a question against your companies documentation</h1>
            <form method="post" action="" className="w-2/6 shadow-md">
                <div className="relative w-full text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <img src="assets/searchIcon.svg" alt="SearchIcon" className="w-full h-4" />
                    </span>
                    <input type="search" name="q" className="w-full py-2 pl-8 text-sm text-white rounded-md bg-secondary focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Ask a Question..." required/>
                </div>
            </form>
            {
            true ?
            <div className="flex flex-col w-full bg-white rounded-md shadow-md my-14">
                <div className="flex flex-row justify-between">
                    <h2 className="p-4 text-md">Answer</h2>
                    <div className="p-4 text-sm">
                        <span className="px-2 py-1 mx-2 text-green-600 bg-green-200 rounded">Good</span>
                        <span className="px-2 py-1 mx-2 text-red-600 bg-red-200 rounded">Bad</span>
                    </div>
                </div>
                <p className="p-6 text-sm">
                test
                </p>
            </div>
            :
            null
            }
            
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}

// export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
//     // console.log(request);
//     // return await authenticator.isAuthenticated(request, {
//     //     failureRedirect: '/login'
//     // })
// }