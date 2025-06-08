'use client'
import Link from 'next/link'
import React from 'react'
import { FaUserAstronaut } from 'react-icons/fa6'

const QuestionNavbar = () => {
    return (
        <div className='sticky top-0 z-[1] bg-[#101010] px-3'>
            <div className='flex items-center h-14'>
                <Link className='' href={'/'}>
                    <h1 className='text-xl font-bold tracking-wide text-secondary mr-2'>
                        CodePlus
                    </h1>
                </Link>


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

export default QuestionNavbar