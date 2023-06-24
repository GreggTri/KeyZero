import type { LoaderFunction, LoaderArgs, ActionFunction, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export default function AddDocs() {

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