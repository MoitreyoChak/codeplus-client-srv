"use client";

import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import StatsOverview from "./StatsOverview";
import CommunityStats from "./CommunityStats";
import SkillsSection from "./SkillsSection";
import ActivityCalendar from "./ActivityCalendar";
import SubmissionsTabs from "./SubmissionsTabs";
import NoSubmissions from "./NoSubmissions";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("recent");

    return (
        <div className="min-h-screen p-6 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left column - Profile info */}
                    <div className="space-y-4">
                        <ProfileHeader />
                        <CommunityStats />
                        <div className="bg-[#1e1e1e] rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-3">Languages</h3>
                            <p className="text-sm text-gray-400">Not enough data</p>
                        </div>
                        <SkillsSection />
                    </div>

                    {/* Right two columns - Stats and activity */}
                    <div className="lg:col-span-2 space-y-4">
                        <StatsOverview />
                        {/* <ActivityCalendar /> */}
                        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
                            <SubmissionsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                            <NoSubmissions />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}