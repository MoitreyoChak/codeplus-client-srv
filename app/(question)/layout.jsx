import React from 'react'
import QuestionNavbar from "./QuestionNavbar"

export default function QuestionLayout({ children }) {
    return (
        <div className='h-screen bg-primary flex flex-col'>
            <QuestionNavbar />
            {children}
        </div>
    )
}
