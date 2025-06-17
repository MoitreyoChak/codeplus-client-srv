"use client";

import { useEffect, useState } from "react";

export function CircularProgress({ user }) {
  const totalQuestions = user?.totalQuestions || 0;
  const completedQuestions = user?.solved || 0;
  let completedPercentage = (completedQuestions / totalQuestions) * 100 || 0;
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Animation effect for the progress circle
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to completed value
    // setProgress(completedPercentage);
    setTimeout(() => {
      setProgress(completedPercentage);
    }, 200); // Delay to allow the circle to render before animating
  }, [user]);
  console.log("progress", progress);

  return (
    <div className="relative w-30 h-30 flex items-center justify-center">
      {/* Background circle */}
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#333"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle - yellowish top gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#yellow-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - 0)}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            strokeDashoffset: circumference * (1 - progress / 100),
          }}
        />
        {/* Progress circle - cyan bottom gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#cyan-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - 0)}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out opacity-75"
          style={{
            strokeDashoffset: circumference * (1 - progress / 100),
          }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient
            id="yellow-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>
          <linearGradient id="cyan-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Counter in the middle */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold">{completedQuestions}</div>
        <div className="text-sm text-gray-400">/{totalQuestions}</div>
        <div className="text-xs mt-1">Solved</div>
      </div>
    </div>
  );
}
