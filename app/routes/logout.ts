import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";

export const action: ActionFunction = async ({ request }) => {
    return await authenticator.logout(request, { redirectTo: "/login" });
}

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/login'
    })
}