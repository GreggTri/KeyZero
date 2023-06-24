import { NavLink } from '@remix-run/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function NavBar() {

    return(
        <div className='flex flex-row bg-primary w-full p-2 items-center shadow-black shadow-md'>
            <NavLink to="/search" className='flex mb-2 ml-12'>
                <img className='w-full h-8' src="assets/KeyZeroDarkLogo.svg" alt="" />
            </NavLink>
            <NavLink to="/addDocs" className='flex mx-5 text-sm whitespace-nowrap'>COMPANY DOCS</NavLink>
            <NavLink to="/history" className='flex mx-5 text-sm whitespace-nowrap'>YOUR PREVIOUS QUESTIONS</NavLink>
            <NavLink to="/account" className='ml-auto mb-1 mr-4 justify-self-end'>
                <UserCircleIcon className='w-ful h-10 '/>
            </NavLink>
        </div>
    );
}