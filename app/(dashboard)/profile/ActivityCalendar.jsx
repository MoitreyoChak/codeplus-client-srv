"use client";

import { useState, useEffect } from "react";

export default function ActivityCalendar() {
    // For demo, generate empty calendar data for a year
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        // Generate empty calendar data (52 weeks x 7 days)
        const emptyData = Array(52).fill(0).map(() => Array(7).fill(0));
        setCalendarData(emptyData);
    }, []);

    // Get month labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    const visibleMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <div className="bg-[#1e1e1e] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <h3 className="text-xl font-bold">0</h3>
                    <span className="ml-2 text-gray-400">submissions in the past one year</span>
                    <div className="ml-2 text-gray-400 text-sm rounded-full bg-gray-700 w-5 h-5 flex items-center justify-center">?</div>
                </div>
                <div className="text-gray-400 text-sm">
                    <span className="mr-4">Total active days: 0</span>
                    <span>Max streak: 0</span>
                </div>
            </div>

            <div className="relative">
                {/* Month labels */}
                <div className="flex text-xs text-gray-400 mb-1">
                    <div className="w-8"></div>
                    {visibleMonths.map((monthIndex) => (
                        <div key={monthIndex} className="flex-1 text-center">
                            {months[monthIndex % 12]}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="flex">
                    {/* Day labels */}
                    <div className="flex flex-col text-xs text-gray-400 mr-2 space-y-[14px]">
                        <div>Mon</div>
                        <div>Wed</div>
                        <div>Fri</div>
                        <div>Sun</div>
                    </div>

                    {/* Calendar cells */}
                    <div className="flex-1 grid grid-cols-52 gap-x-1">
                        {calendarData.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-y-1">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className="w-3 h-3 bg-[#282828] rounded-sm"
                                        title="No contributions"
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}