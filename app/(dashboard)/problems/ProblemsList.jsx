import React from "react";
import { CheckSquare, FileText } from "lucide-react";

const questions = [
    {
        id: 3375,
        title: "Minimum Operations to Make Array Val...",
        link: "#",
        status: "solved",
        solution: true,
        acceptance: "56.2%",
        difficulty: "Easy",
    },
    {
        id: 1,
        title: "Two Sum",
        link: "#",
        status: "attempted",
        solution: true,
        acceptance: "55.3%",
        difficulty: "Easy",
    },
    {
        id: 2,
        title: "Add Two Numbers",
        link: "#",
        status: "unattempted",
        solution: true,
        acceptance: "45.7%",
        difficulty: "Medium",
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Char...",
        link: "#",
        status: "unattempted",
        solution: true,
        acceptance: "36.5%",
        difficulty: "Medium",
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        link: "#",
        status: "unattempted",
        solution: true,
        acceptance: "43.2%",
        difficulty: "Hard",
    },
    {
        id: 5,
        title: "Longest Palindromic Substring",
        link: "#",
        status: "unattempted",
        solution: true,
        acceptance: "35.5%",
        difficulty: "Medium",
    },
];

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

const ProblemsList = () => {
    return (
        <div className="text-gray-300 w-full ">
            {/* Header Row */}
            <div className="flex items-center justify-between px-2 py-3 text-sm text-gray-400 border-b border-gray-600">
                <div className="w-[10%] mx-auto">Status</div>
                <div className="w-[40%] mx-auto">Title</div>
                <div className="w-[10%] mx-auto">Solution</div>
                <div className="w-[15%] mx-auto">Acceptance</div>
                <div className="w-[15%] mx-auto">Difficulty</div>
            </div>

            {/* Question Rows */}
            {questions.map((q, index) => (
                <div
                    key={q.id}
                    className={`flex items-center justify-between px-2 py-3 text-sm ${index % 2 === 0 ? "bg-black/30" : "bg-black/10"
                        } hover:bg-black/30 transition-colors duration-150`}
                >
                    <div className="w-[10%] flex justify-center">
                        {getStatusIcon(q.status)}
                    </div>
                    <div className="w-[40%] truncate">
                        <span className="text-gray-400">{q.id}. </span>
                        <a
                            href={`/question/${q.id}`}
                            className="text-blue-400 hover:underline whitespace-nowrap"
                        >
                            {q.title}
                        </a>
                    </div>
                    <div className="w-[10%] flex justify-center">
                        {q.solution && <FileText className="text-purple-400" size={18} />}
                    </div>
                    <div className="w-[15%]">{q.acceptance}</div>
                    <div className={`w-[15%] font-medium ${getDifficultyColor(q.difficulty)}`}>
                        {q.difficulty}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProblemsList;
