import stylesheet from "~/tailwind.css";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import NavBar from "~/components/NavBar"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "KeyZero" }, { name: "description", content: "Welcome to KeyZero!" }];
};

export default function App() {

  const matches = useMatches();

  const isLoginOrSignup = !!matches.find((match) => match.pathname === "/login" || match.pathname === "/signup")

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="max-w-screen max-h-screen">
      {isLoginOrSignup ? 
        null
        :
        <header>
          <NavBar/>
        </header>}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
