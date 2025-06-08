'use client'
import React, { useState, useRef } from 'react';
import { Code2, Users, MessageSquare, Send, BookOpen, Layout, Plus } from 'lucide-react';
import { FaTrash } from 'react-icons/fa6';
import TestCases from './TestCases'
import CodeArea from './CodeArea'

const question = {
    "status": "success",
    "data": {
        "title": "2 sum",
        "tags": [
            "arrays",
            "greedy"
        ],
        "difficulty": "Easy",
        "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        "note": " You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "examples": [
            {
                "input": "nums = [2,7,11,15], target = 9",
                "output": "[0,1]",
                "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1].",
                "_id": "67eae85029508512fd77ce6a"
            }
        ],
        "constraints": [
            "2 <= nums.length <= 104",
            "-109 <= nums[i] <= 109",
            "-109 <= target <= 109"
        ],
        "testcases": [
            {
                "input": "nums = [2,7,11,15], target = 9",
                "expectedOutput": "[0,1]",
                "_id": "67eae85029508512fd77ce6b"
            },
            {
                "input": "nums = [2,7,11,15], target = 13",
                "expectedOutput": "[0,2]",
                "_id": "67eae85029508512fd77ce6c"
            }
        ]
    }
}


function Test() {
    const [isDragging, setIsDragging] = useState(false);
    const [isVerticalDragging, setIsVerticalDragging] = useState(false);
    const [splitPosition, setSplitPosition] = useState(50);
    const [verticalSplitPosition, setVerticalSplitPosition] = useState(50);

    const [testCases, setTestCases] = useState([
        '2 7 11 15 9',
        '3 2 4 6',
        '3 3 6',
    ]);
    const containerRef = useRef(null);
    const rightPanelRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleVerticalMouseDown = (e) => {
        setIsVerticalDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (isDragging && containerRef.current) {
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            setSplitPosition(Math.min(Math.max(percentage, 20), 80));
        }

        if (isVerticalDragging && rightPanelRef.current) {
            const container = rightPanelRef.current;
            const containerRect = container.getBoundingClientRect();
            const percentage = ((e.clientY - containerRect.top) / containerRect.height) * 100;
            setVerticalSplitPosition(Math.min(Math.max(percentage, 30), 85));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsVerticalDragging(false);
    };



    return (
        <div
            ref={containerRef}
            className="flex-1 flex bg-gray-900 text-gray-200"
            style={{ maxHeight: 'calc(100vh - 56px)' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Header */}
            {/* <header className="h-12 bg-gray-800 flex items-center px-4 border-b border-gray-700">
                <h1 className="text-xl font-semibold">1. Two Sum</h1>
                <div className="ml-auto flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-700 rounded"><Layout className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-gray-700 rounded"><Users className="w-5 h-5" /></button>
                </div>
            </header> */}

            {/* Left panel */}
            <div
                className="h-full overflow-auto"
                style={{ width: `${splitPosition}%` }}
            >
                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <MessageSquare className="w-5 h-5" />
                        <Code2 className="w-5 h-5" />
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <p className="mb-4">
                            Given an array of integers <code className="bg-gray-700 px-1 rounded">nums</code> and an integer <code className="bg-gray-700 px-1 rounded">target</code>, return indices of the two numbers such that they add up to <code className="bg-gray-700 px-1 rounded">target</code>.
                        </p>
                        <p className="mb-4">
                            You may assume that each input would have exactly one solution, and you may not use the same element twice.
                        </p>
                        <p>You can return the answer in any order.</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="font-semibold mb-4">Example 1:</h3>
                        <pre className="bg-gray-900 p-4 rounded-lg mb-4">
                            <code>
                                Input: nums = [2,7,11,15], target = 9{'\n'}
                                Output: [0,1]{'\n'}
                                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                            </code>
                        </pre>
                    </div>
                </div>
            </div>

            {/* Horizontal Resizer */}
            <div
                className="w-1 bg-gray-700 cursor-col-resize hover:bg-blue-500 active:bg-blue-600"
                onMouseDown={handleMouseDown}
            />

            {/* Right panel */}
            <div
                ref={rightPanelRef}
                className="flex flex-col"
                style={{ width: `${100 - splitPosition}%` }}
            >
                <>
                    {/* Code editor header */}
                    <div className="bg-gray-800 p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                            <select className="bg-gray-900 text-gray-200 px-3 py-1 rounded border border-gray-700">
                                <option>JavaScript</option>
                                <option>Python</option>
                                <option>Java</option>
                                <option>C++</option>
                            </select>
                            <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded flex items-center space-x-2">
                                <Send className="w-4 h-4" />
                                <span>Run</span>
                            </button>
                        </div>
                    </div>

                    {/* Code editor */}
                    <div
                        className="bg-gray-900 p-4 font-mono overflow-auto"
                        style={{ height: `${verticalSplitPosition}%` }}
                    >
                        <CodeArea />
                    </div>
                </>
                {/* Vertical Resizer */}
                <div
                    className="h-1 bg-gray-700 cursor-row-resize hover:bg-blue-500 active:bg-blue-600"
                    onMouseDown={handleVerticalMouseDown}
                />

                {/* Test cases section */}
                <div
                    className="bg-gray-800 border-t border-gray-700 overflow-auto"
                    style={{ height: `${100 - verticalSplitPosition}%` }}
                >
                    <TestCases testCases={testCases} setTestCases={setTestCases} />
                </div>
            </div>
        </div>
    );
}

export default Test;