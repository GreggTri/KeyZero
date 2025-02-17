import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/search',
    failureRedirect: '/login'
  })

}