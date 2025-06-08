'use client'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const AuthLayout = ({ children }) => {
    const pathname = usePathname();
    console.log(pathname)
    const router = useRouter();
    return (
        <div className='h-screen flex bg-primary'>
            <div className={`w-1/2 transition-all duration-500 ease-in-out ${pathname === '/signin' ? '' : 'translate-x-[100%]'}`}>
                {children}

            </div>
            {/* <div className={`w-1/2 ${pathname === '/signin' ? 'order-1' : 'order-2'}`}></div> */}
            <div className={`w-1/2 flex justify-center items-center transition-all duration-500 ease-in-out ${pathname === '/signin' ? '' : '-translate-x-[100%]'}`}>
                <div className='flex flex-col gap-2 p-4'>
                    <div className='flex flex-col'>
                        <p className='text-lg text-gray-400'>Welcome To </p>
                        <h1 className='text-7xl font-bold text-secondary tracking-wide ml-auto'>CodePlus</h1>
                    </div>
                    <Image
                        src={'/hero-prog.png'}
                        alt='Image'
                        width={400}
                        height={400}
                        className='mx-auto'
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout