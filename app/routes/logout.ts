import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.logout(request, { redirectTo: "/login" });
}