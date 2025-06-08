import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa6';

const TestCases = ({ testCases, setTestCases }) => {
    const [selectedCase, setSelectedCase] = useState(0);

    const addNewTestCase = () => {
        setTestCases([...testCases, { nums: [], target: 0 }]);
        setSelectedCase(testCases.length);
    };

    const deleteTestCase = (index, e) => {
        e.stopPropagation();
        const prevLength = testCases.length;
        setTestCases(testCases.filter((ele, i) => {
            if (i == index)
                return false
            return true
        }))
        if (selectedCase > prevLength - 2) {
            setSelectedCase(prevLength - 2);
            console.log(prevLength - 2)
            console.log(testCases[prevLength - 2]);
        }
    }

    const updateTestCase = (value) => {
        const newTestCases = [...testCases];
        newTestCases[selectedCase] = value;
        setTestCases(newTestCases);
    };

    return (
        <div className="p-4">
            <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold">Testcase</h3>
                <div className="ml-4 flex space-x-2">
                    {testCases.map((_, index) => (
                        <button
                            key={index}
                            className={`flex items-center pl-4 pr-3 py-1 rounded ${selectedCase === index
                                ? 'bg-gray-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            onClick={() => { setSelectedCase(index) }}
                        >
                            Case {index + 1}
                            <div className='text-pink-500 hover:text-red-600 ml-1 text-sm' onClick={(e) => deleteTestCase(index, e)}>
                                <FaTrash />
                            </div>
                        </button>
                    ))}
                    <button
                        onClick={addNewTestCase}
                        className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 flex items-center"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={`${testCases[selectedCase]}`}
                        onChange={(e) => updateTestCase(e.target.value)}
                        className="w-full bg-gray-900 text-gray-200 px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default TestCases