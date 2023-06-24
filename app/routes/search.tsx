import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useState } from "react";

export default function Search() {

    return (
        <div className='h-screen p-3 bg-background'>
            <h1>Ask a question against your companies documentation</h1>
            <div >
                <form action="" method="post">
                    <input type="text" />
                </form>
            </div>
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