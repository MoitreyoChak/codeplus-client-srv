'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaAngleDown, FaUserAstronaut } from "react-icons/fa6";
const Navbar = () => {
    const [exploreDropdown, setExploreDropdown] = useState(false);
    return (
        <div className='sticky top-0 z-[1] bg-[#101010] py-5 px-3'>
            <div className='flex max-w-7xl items-center mx-auto'>
                <Link className='' href={'/'}>
                    <h1 className='text-xl font-bold tracking-wide text-secondary mr-2'>
                        CodePlus
                    </h1>
                </Link>
                <div
                    onMouseLeave={() => setExploreDropdown(false)}
                    onMouseEnter={() => setExploreDropdown(true)}
                    className='ml-3 group hover:text-secondary/90 text-gray-300/80 cursor-pointer flex items-center gap-[3px] relative'>
                    Explore
                    <FaAngleDown className={`transition-all duration-200 group-hover:rotate-180`} />

                    <div className={`absolute top-0 pt-12 transition-all duration-300 ${exploreDropdown ? ' flex' : ' hidden '}`}>
                        <div className='flex bg-black py-2 px-3 w-44 shadow shadow-gray-500/30 rounded'>
                            <div className='flex flex-col text-sm w-full'>
                                <p className='text-gray-300/80 hover:text-secondary/90 w-full border-b-[1px] py-2'>Problem of the day</p>
                                <p className='text-gray-300/80 hover:text-secondary/90 w-full py-2'>Problem of the week</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ml-3 hover:text-secondary/90  text-gray-300/80 cursor-pointer'>
                    <Link href={'/problems'}>Problems</Link>
                </div>

                {/* profile  */}
                <div className='ml-auto'>
                    <Link href='/profile' >
                        <div className='py-2 px-2 border border-secondary rounded-full'>
                            <FaUserAstronaut className='text-secondary' />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar