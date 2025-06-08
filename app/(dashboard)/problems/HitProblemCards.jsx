import React from "react";

const HitProblemCards = () => {
    const cards = [
        {
            title: "Codeplus's Interview Crash Course:",
            subtitle: "System Design for Interviews and Beyond",
            buttonText: "Start Learning",
            bg: "bg-gradient-to-br from-green-700 to-emerald-400",
        },
        {
            title: "Codeplus's Interview Crash Course:",
            subtitle: "Data Structures and Algorithms",
            buttonText: "Start Learning",
            bg: "bg-gradient-to-br from-indigo-500 to-purple-400",
        },
        {
            title: "Top Interview Questions",
            subtitle: "",
            buttonText: "Get Started",
            bg: "bg-gradient-to-br from-blue-500 to-sky-400",
        },
    ];

    return (
        <div className="flex gap-6 justify-center py-4 ">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`w-1/3 rounded-xl p-6 cursor-pointer text-white shadow-xl ${card.bg} relative overflow-hidden transition-transform hover:scale-105`}
                >
                    <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                    {card.subtitle && <p className="mb-4 text-sm">{card.subtitle}</p>}
                    <button className="bg-white text-black font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition">
                        {card.buttonText}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default HitProblemCards;
