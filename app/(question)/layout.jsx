import React from 'react'
import QuestionNavbar from "./QuestionNavbar"

export default function QuestionLayout({ children }) {
    return (
        <div className='h-screen flex flex-col'>
            <QuestionNavbar />
            {children}
        </div>
    )
}
