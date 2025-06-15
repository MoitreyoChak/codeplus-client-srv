import React, { useEffect } from "react";
import { CheckSquare, FileText } from "lucide-react";
import Link from "next/link";
import { questionApi } from "../../../lib/backendApi.js";

// const questions = [
//   {
//     id: 3375,
//     title: "Minimum Operations to Make Array Val...",
//     link: "#",
//     solution: true,
//     difficulty: "Easy",
//   },
//   {
//     id: 1,
//     title: "Two Sum",
//     link: "#",
//     solution: true,
//     difficulty: "Easy",
//   },
//   {
//     id: 2,
//     title: "Add Two Numbers",
//     link: "#",
//     solution: true,
//     difficulty: "Medium",
//   },
//   {
//     id: 3,
//     title: "Longest Substring Without Repeating Char...",
//     link: "#",
//     solution: true,
//     difficulty: "Medium",
//   },
//   {
//     id: 4,
//     title: "Median of Two Sorted Arrays",
//     link: "#",
//     solution: true,
//     difficulty: "Hard",
//   },
//   {
//     id: 5,
//     title: "Longest Palindromic Substring",
//     link: "#",
//     status: "unattempted",
//     solution: true,
//     difficulty: "Medium",
//   },
// ];

let status = "solved";
let acceptance = "56.2%";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-teal-400";
    case "Medium":
      return "text-yellow-400";
    case "Hard":
      return "text-red-400";
    default:
      return "text-gray-300";
  }
};

const getStatusIcon = (status) => {
  if (status === "solved")
    return <CheckSquare className="text-green-400" size={18} />;
  return null;
};

const ProblemsList = ({ questions, setQuestions }) => {
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions");
        const response = await questionApi.get(`/all`);
        setQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <div className="text-gray-300 w-full ">
      {/* Header Row */}
      <div className="flex items-center justify-between px-2 py-3 text-sm text-gray-400 border-b border-gray-600">
        <div className="w-[10%] mx-auto">Status</div>
        <div className="w-[40%] mx-auto">Title</div>
        {/* <div className="w-[10%] mx-auto">Solution</div> */}
        <div className="w-[15%] mx-auto">Acceptance</div>
        <div className="w-[15%] mx-auto">Difficulty</div>
      </div>

      {/* Question Rows */}
      {questions?.map((q, index) => (
        <div
          key={q._id}
          className={`flex items-center justify-between px-2 py-3 text-sm ${
            index % 2 === 0 ? "bg-black/30" : "bg-black/10"
          } hover:bg-black/30 transition-colors duration-150`}
        >
          <div className="w-[10%] flex justify-center">
            {getStatusIcon(status)}
          </div>
          <div className="w-[40%] truncate">
            {/* <span className="text-gray-400">{q.id}. </span> */}
            <Link
              href={`/question/${q._id}`}
              className="text-blue-400 hover:underline whitespace-nowrap"
            >
              {q.title}
            </Link>
          </div>
          {/* <div className="w-[10%] flex justify-center">
                        {q.solution && <FileText className="text-purple-400" size={18} />}
                    </div> */}
          <div className="w-[15%]">{acceptance}</div>
          <div
            className={`w-[15%] font-medium ${getDifficultyColor(
              q.difficulty
            )}`}
          >
            {q.difficulty}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemsList;
