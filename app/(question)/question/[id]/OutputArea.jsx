import React from 'react'

const OutputArea = ({ output }) => {
    const result = 'error';
    return (
        <div className="p-4">
            <div className=''>
                <div className={`${result == 'Accepted' ? 'text-green-500' : result == 'tle' ? 'text-amber-400' : 'text-red-600'} py-0.5 px-2 bg-gray-200/10 rounded w-fit mb-3`}>
                    {result}
                </div>
                {
                    result != 'Accepted' &&
                    <div className={`p-2 bg-black/30 mb-2 ${result == 'tle' ? 'text-amber-400' : 'text-red-600'}`}>
                        {
                            'Error occured at line no: 39'
                        }
                    </div>
                }

            </div>
            <div className='flex gap-2 '>
                {output.map((ele, i) => (
                    <div className='bg-slate-700 px-4 py-0.5 rounded' key={i}>
                        input {i + 1}
                    </div>
                ))}
            </div>
            <div className=''></div>
        </div>
    )
}

export default OutputArea