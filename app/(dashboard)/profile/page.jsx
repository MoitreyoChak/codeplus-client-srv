"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProfileHeader from "./ProfileHeader";
import StatsOverview from "./StatsOverview";
import CommunityStats from "./CommunityStats";
import SkillsSection from "./SkillsSection";
import ActivityCalendar from "./ActivityCalendar";
import SubmissionsTabs from "./SubmissionsTabs";
import NoSubmissions from "./NoSubmissions";
import { useRouter } from "next/navigation";
import { userApi } from "../../../lib/backendApi.js";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("recent");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  console.log("Session Status:", status);

  const router = useRouter();

  const solvedLanguages =
    user?.languages?.filter((lang) => lang.solved > 0) || [];

  useEffect(() => {
    if (status === "loading") {
      // Still checking authentication status
      return;
    }

    if (status === "unauthenticated") {
      console.log("User is not authenticated, redirecting to login...");
      // Redirect to login page or handle unauthenticated state
      router.push("/signin");
      return;
    }
    const fetchUser = async () => {
      try {
        setLoading(true);
        console.log("Fetching user details...");
        const response = await userApi.get(`/profile`);
        console.log("User data fetched:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [status, router]);
  console.log("user Data:", user);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen p-6 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
  //   "languages": [
  //         {
  //             "language": "c",
  //             "solved": 0,
  //         },
  //         {
  //             "language": "cpp",
  //             "solved": 0,
  //         },
  //         {
  //             "language": "java",
  //             "solved": 0,
  //         }
  //     ]

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column - Profile info */}
          <div className="space-y-4">
            <ProfileHeader user={user} />

            <div className="bg-[#1e1e1e] rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                {solvedLanguages.length > 0 ? (
                  solvedLanguages.map((lang) => (
                    <div
                      key={lang.language}
                      className="bg-black/30 rounded-full p-3 flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-300">
                        {lang.language}
                      </span>
                      <span className="text-sm text-gray-400">
                        {lang.solved} solved
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-400">
                    Not enough data
                  </div>
                )}
              </div>
              {/* <p className="text-sm text-gray-400">Not enough data</p> */}
            </div>
            <SkillsSection user={user} />
            <CommunityStats />
          </div>

          {/* Right two columns - Stats and activity */}
          <div className="lg:col-span-2 space-y-4">
            <StatsOverview user={user} />
            {/* <ActivityCalendar /> */}
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
              <SubmissionsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <NoSubmissions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
