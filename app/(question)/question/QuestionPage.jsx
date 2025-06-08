import React, { useState, useRef } from 'react';
import { Code2, Users, MessageSquare, Send, BookOpen, Layout } from 'lucide-react';

function QuestionPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [splitPosition, setSplitPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        setSplitPosition(Math.min(Math.max(percentage, 20), 80));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };



    return (
        <div
            ref={containerRef}
            className="h-[100vh-56px] flex flex-col bg-gray-900 text-gray-200"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Header */}
            <header className="h-12 bg-gray-800 flex items-center px-4 border-b border-gray-700">
                <h1 className="text-xl font-semibold">1. Two Sum</h1>
                <div className="ml-auto flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-700 rounded"><Layout className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-gray-700 rounded"><Users className="w-5 h-5" /></button>
                </div>
            </header>

            {/* Main content */}
            <div className="flex-1 flex">
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

                {/* Resizer */}
                <div
                    className="w-1 bg-gray-700 cursor-col-resize hover:bg-blue-500 active:bg-blue-600"
                    onMouseDown={handleMouseDown}
                />

                {/* Right panel */}
                <div
                    className="h-full"
                    style={{ width: `${100 - splitPosition}%` }}
                >
                    <div className="h-full flex flex-col">
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
                        <div className="flex-1 bg-gray-900 p-4 font-mono">
                            <pre className="text-gray-300">
                                {`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;