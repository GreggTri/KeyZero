import { NavLink } from '@remix-run/react'
import { useState } from 'react';

export default function HistoryTab() {

    return(
        <div className='flex flex-row text-white justify-between bg-[#2f2e2d] rounded-md py-1 px-1 items-center w-auto my-1'>
            <div className="flex flex-row flex-grow items-center">
                <span className='text-xs md:text-sm'>5:44 PM 06/17/2023</span>
                <img className='mx-2 h-6' src="assets/Line.svg" alt="line" />
                <span className='text-xs md:text-sm whitespace-nowrap truncate flex-grow '>What material is our product made out of?</span>
            </div>
            
            <img className='mx-2 h-6 ' src="assets/Line.svg" alt="line2" />
            <button className='flex flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
    );
}