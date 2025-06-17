"use client";
import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Code2,
  Users,
  MessageSquare,
  Send,
  BookOpen,
  Layout,
  Plus,
} from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import TestCases from "./TestCases";
import CodeArea from "./CodeArea";
import OutputArea from "./OutputArea";
// import { questionApi } from "@/lib/backendApi.js";
import { questionApi } from "../../../../lib/backendApi.js";

// const question = {
//   status: "UnSolved",
//   data: {
//     title: "2 Sum",
//     tags: ["Array", "List", "Linked List", "Graph"],
//     difficulty: "Easy",
//     description: [
//       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//       "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
//     ],
//     note: " You may assume that each input would have exactly one solution, and you may not use the same element twice.",
//     examples: [
//       {
//         input: "nums = [2,7,11,15], target = 9",
//         output: "[0,1]",
//         explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
//         _id: "67eae85029508512fd77ce6a",
//       },
//       {
//         input: "nums = [3,10,2,8], target = 5",
//         output: "[0,2]",
//         explanation: "Because nums[0] + nums[2] == 5, we return [0, 2].",
//         _id: "67eae85029508512fd77ce6a",
//       },
//     ],
//     constraints: [
//       "2 <= nums.length <= 104",
//       "-109 <= nums[i] <= 109",
//       "-109 <= target <= 109",
//     ],
//     testcases: [
//       [
//         {
//           key: "nums",
//           label: "Array (nums)",
//           val: "[2,7,11,15]",
//           type: "array",
//         },
//         {
//           key: "target",
//           label: "Target",
//           val: "9",
//           type: "number",
//         },
//         { expectedOutput: "[0,1]" },
//       ],
//       [
//         {
//           key: "nums",
//           label: "Array (nums)",
//           val: "[3,10,2,8]",
//           type: "array",
//         },
//         { key: "target", label: "Target", val: "13", type: "number" },
//         { expectedOutput: "[0,2]" },
//       ],
//     ],
//   },
// };

function Test() {
  const [isDragging, setIsDragging] = useState(false);
  const [isVerticalDragging, setIsVerticalDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const [verticalSplitPosition, setVerticalSplitPosition] = useState(50);
  //   const [solved, setSolved] = useState(new Set());
  const [result, setResult] = useState();

  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);

  const [question, setQuestion] = useState();
  let solved = "UnSolved";

  const params = useParams();

  // Using useEffect to fetch question data
  React.useEffect(() => {
    if (!params.id) return;
    const fetchQuestion = async () => {
      try {
        console.log("Fetching question data for ID:", params.id);
        const response = await questionApi.get(`/get/${params.id}`);
        // question = response.data;
        setQuestion(response.data);
        console.log("Fetched question data:", question);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };
    if (params.id) fetchQuestion();
  }, []);

  let difficultyColor = "text-green-400";
  if (question?.data.difficulty === "Medium") {
    difficultyColor = "text-yellow-400";
  } else if (question?.data.difficulty === "Hard") {
    difficultyColor = "text-red-400";
  }

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
      const percentage =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setSplitPosition(Math.min(Math.max(percentage, 20), 80));
    }

    if (isVerticalDragging && rightPanelRef.current) {
      const container = rightPanelRef.current;
      const containerRect = container.getBoundingClientRect();
      const percentage =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;
      setVerticalSplitPosition(Math.min(Math.max(percentage, 30), 85));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsVerticalDragging(false);
  };

  const [testCaseModal, setTestCaseModal] = useState(true);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex text-gray-200 custom-scrollbar"
      style={{
        maxHeight: "calc(100vh - 56px)",
        scrollbarWidth: "auto",
        scrollbarColor: "#181818 #e5e7eb15",
      }}
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

          {/* question box */}
          <div className="rounded-lg bg-black/30 px-6 pt-4 pb-2.25 mb-4">
            <div className="flex justify-between">
              {/* Add question title */}
              <h2 className="text-2xl font-semibold mb-2">
                {question?.data.title}
              </h2>
              {/* Add question status icon */}
              <div className="flex items-center space-x-2 mb-4">
                <span
                  className={`text-sm py-0.5 px-2 rounded-md ${
                    question?.status === "Solved"
                      ? "bg-green-800 text-green-300"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {solved}
                </span>
              </div>
            </div>

            {/* Add question tags */}
            <div className="flex space-x-2 pt-2 mb-4">
              {question?.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary text-xs text-white px-3 hover:bg-gray-300 hover:text-black cursor-pointer py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Add question difficulty */}
            <div className="text-xs text-gray-400 mb-4">
              Difficulty:{" "}
              <span className={`${difficultyColor} font-semibold text-sm`}>
                {question?.data.difficulty}
              </span>
            </div>

            {/* question statement */}
            {/* <code className="bg-gray-700 px-1 rounded">nums</code> */}
            {question?.data.description.map((desc, index) => (
              <p key={index} className="mb-4">
                {desc}
              </p>
            ))}
          </div>

          {/* Add Examples */}
          <div className="bg-black/30 rounded-lg px-6 pb-4 pt-2">
            {question?.data.examples.map((example, index) => (
              <div
                key={index}
                className="pb-4 border-b border-gray-600 last:border-0"
              >
                <h3 className="font-semibold mb-2 pt-3">
                  Example {index + 1}:
                </h3>
                <pre className="bg-slate-800/30 text-gray-400 p-4 rounded-lg">
                  <code>
                    Input: {example.input}
                    {"\n"}
                    Output: {example.output}
                    {"\n"}
                    Explanation: {example.explanation}
                  </code>
                </pre>
              </div>
            ))}
          </div>

          {/* Add question constraints */}
          <div className="bg-black/30 rounded-lg py-3 px-5 pb-5 mt-4">
            <h3 className="font-semibold mb-4">Constraints:</h3>
            <ul className="list-disc pl-6 space-y-2">
              {question?.data.constraints.map((constraint, index) => (
                <li
                  key={index}
                  className="text-sm font-semibold  text-gray-400"
                >
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
          {/* Add note */}
          <div className="bg-black/30 rounded-lg py-3 px-5 pb-5 mt-4">
            <h3 className="font-semibold mb-4">Note:</h3>
            <p className="text-sm text-gray-400">{question?.data.note}</p>
          </div>
          {}
        </div>
      </div>

      {/* Horizontal Resizer */}
      <div
        className="w-1 bg-black cursor-col-resize hover:bg-blue-500 active:bg-blue-600 relative"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 bg-gray-50 h-7 w-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="flex flex-col"
        style={{ width: `${100 - splitPosition}%` }}
      >
        <>
          {/* Code editor */}
          <div
            className="p-4 font-mono overflow-auto"
            style={{ height: `${verticalSplitPosition}%` }}
          >
            <CodeArea
              testCases={question?.data.testcases}
              questionTitle={question?.data.title}
              setResult={setResult}
              tags={question?.data.tags}
              difficulty={question?.data.difficulty}
            />
            {/* <CodeArea /> */}
          </div>
        </>
        {/* Vertical Resizer */}
        <div
          className="relative h-1 bg-black cursor-row-resize hover:bg-blue-500 active:bg-blue-600"
          onMouseDown={handleVerticalMouseDown}
        >
          <div className="absolute top-1/2 bg-gray-50 h-[20%] w-7 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Test cases section */}
        <div
          className=" border-t border-gray-700 overflow-auto"
          style={{ height: `${100 - verticalSplitPosition}%` }}
        >
          <div className="flex ml-2 mt-2 gap-2 text-xs">
            <div
              className={`border py-0.5 px-3 cursor-pointer rounded ${
                testCaseModal ? "bg-gray-400 border-transparent" : ""
              } transition-all duration-500`}
              onClick={() => setTestCaseModal(true)}
            >
              TestCases
            </div>
            <div
              className={`border py-0.5 px-3 cursor-pointer rounded ${
                !testCaseModal ? "bg-gray-400 border-transparent" : ""
              } transition-all duration-500`}
              onClick={() => setTestCaseModal(false)}
            >
              Output
            </div>
          </div>
          {testCaseModal ? (
            <TestCases TCs={question?.data.testcases} />
          ) : (
            <OutputArea result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Test;
