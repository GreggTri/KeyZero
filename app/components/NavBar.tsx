import { NavLink } from '@remix-run/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

export default function NavBar() {

    const [Revealed, setReveal] = useState(false)

    return(
        <>
            <nav className='flex flex-row-reverse items-center justify-end w-full p-2 shadow-md md:justify-normal md:flex-row bg-primary '>
                <div className='items-center my-1 mb-2'>
                    <img className='w-32 h-full ' src="assets/KeyZeroDarkLogo.svg" alt="" />
                </div>
                <div className='hidden md:flex md:flex-row'>
                    <div className='flex flex-row items-center'>
                        <NavLink to="/search" className='flex mx-5 text-sm whitespace-nowrap'>SEARCH</NavLink>
                        <NavLink to="/addDocs" className='flex mx-5 text-sm whitespace-nowrap'>COMPANY DOCS</NavLink>
                        <NavLink to="/history" className='flex mx-5 text-sm whitespace-nowrap'>YOUR PREVIOUS QUESTIONS</NavLink>
                        <NavLink to="/account" className='mx-5 ml-auto'>
                            <UserCircleIcon className='w-full h-10 '/>
                        </NavLink>
                    </div>
                </div>
                <div className='flex md:hidden'>
                    {Revealed ?
                    <button
                    className="inline-flex items-center p-2 ml-3 text-sm justify-self-end" 
                    onClick={e => setReveal(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    :
                    <button 
                    data-collapse-toggle="navbar-hamburger" 
                    type="button" 
                    className="inline-flex items-center p-2 ml-3 text-sm justify-self-end" 
                    aria-controls="navbar-hamburger" 
                    aria-expanded="false"
                    onClick={e => setReveal(true)}
                    >
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>}
                </div>
            </nav>
            { Revealed ?
            <div className='flex flex-col md:hidden'>
                <NavLink to="/search" className='flex mx-5 text-sm whitespace-nowrap'>SEARCH</NavLink>
                <NavLink to="/addDocs" className='flex mx-5 text-sm whitespace-nowrap'>COMPANY DOCS</NavLink>
                <NavLink to="/history" className='flex mx-5 text-sm whitespace-nowrap'>YOUR PREVIOUS QUESTIONS</NavLink>
                <NavLink to="/account" className='flex mx-5 text-sm whitespace-nowrap'>ACCOUNT</NavLink>
            </div>
            :
            null
            }

        </>
    );
}