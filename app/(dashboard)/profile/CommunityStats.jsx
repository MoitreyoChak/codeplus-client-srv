import { Eye, MessageSquare, Star, BookOpen } from "lucide-react";

export default function CommunityStats() {
    return (
        <div className="bg-[#1e1e1e] rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Community Stats</h3>

            <div className="space-y-3">
                <StatItem
                    icon={<Eye className="w-5 h-5 text-blue-400" />}
                    label="Views"
                    value={0}
                    lastWeek={0}
                />

                <StatItem
                    icon={<BookOpen className="w-5 h-5 text-green-400" />}
                    label="Solution"
                    value={0}
                    lastWeek={0}
                />

                <StatItem
                    icon={<MessageSquare className="w-5 h-5 text-purple-400" />}
                    label="Discuss"
                    value={0}
                    lastWeek={0}
                />

                <StatItem
                    icon={<Star className="w-5 h-5 text-yellow-400" />}
                    label="Reputation"
                    value={0}
                    lastWeek={0}
                />
            </div>
        </div>
    );
}


function StatItem({ icon, label, value, lastWeek }) {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="ml-3">
                <div className="flex items-center">
                    <span className="mr-2">{label}</span>
                    <span className="font-medium">{value}</span>
                </div>
                <div className="text-xs text-gray-400">Last week {lastWeek}</div>
            </div>
        </div>
    );
}