import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export default function AddDocs() {

    return (
        <div className='flex flex-col items-center h-screen p-3 bg-background'>
            <h1 className="flex my-16 text-2xl font-medium">Insert a folder with your companies documents inside</h1>
            <button className="my-4">
                <img src="assets/squarePlusAdd.svg" alt="AddFolder" />
            </button>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}