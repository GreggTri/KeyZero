import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import HistoryTab from "~/components/HistoryTab"

export default function AddDocs() {

    return (
        <div className='flex h-screen p-3 bg-background'>
            <div className="w-full m-4 bg-white rounded-md shadow-md max-h-96">
                {/* header */}
                <div className="flex flex-row p-6 text-xl font-medium">
                    <span className="mr-16">Time/Date</span>
                    <span>Question</span>
                </div>

                {/* body */}
                <div>
                    {/* this is where history component goes */}
                    <HistoryTab/>
                </div>
            </div>
        </div>
    );
}

export const action: ActionFunction = async ({request}: ActionArgs) => {
    
}