import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useState } from "react";

export default function Search() {

    const [Hide, setHide] = useState(false)

    return (
        <div className='h-screen flex flex-col items-center p-3 bg-background'>
            <h1 className="text-2xl my-14">Ask a question against your companies documentation</h1>
            <form method="post" action="" className="w-2/6 shadow-md">
                <div className="relative w-full text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <img src="assets/searchIcon.svg" alt="SearchIcon" className="w-full h-4" />
                    </span>
                    <input type="search" name="q" className="py-2 w-full text-sm text-white bg-secondary rounded-md pl-8 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Ask a Question..." required/>
                </div>
            </form>
            {
            Hide ?
            null
            :
            <div className="flex flex-col my-14 bg-white shadow-black shadow-md w-full h-full rounded-md">
                <div className="flex flex-row justify-between">
                    <h2 className="text-md p-4">Answer</h2>
                    <div className="text-sm p-4">
                        <span className="mx-2 text-green-500">Good</span>
                        <span className="mx-2 text-red-500">Bad</span>
                    </div>
                </div>
                <p className="text-sm p-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat  incididunt ut laboret. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat  incididunt ut laboret. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat  incididunt ut laboret. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat  incididunt ut laboret.
                </p>

            </div>
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