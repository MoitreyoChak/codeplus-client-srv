import { Clock, List, BookOpen, MessageSquare } from "lucide-react";



export default function SubmissionsTabs({ activeTab, setActiveTab }) {
    return (
        <div className="border-b border-[#333]">
            <div className="flex overflow-x-auto">
                <TabButton
                    active={activeTab === "recent"}
                    onClick={() => setActiveTab("recent")}
                    icon={<Clock className="w-4 h-4 mr-2" />}
                    label="Recent AC"
                />
                <TabButton
                    active={activeTab === "list"}
                    onClick={() => setActiveTab("list")}
                    icon={<List className="w-4 h-4 mr-2" />}
                    label="List"
                />
                <TabButton
                    active={activeTab === "solutions"}
                    onClick={() => setActiveTab("solutions")}
                    icon={<BookOpen className="w-4 h-4 mr-2" />}
                    label="Solutions"
                />
                <TabButton
                    active={activeTab === "discuss"}
                    onClick={() => setActiveTab("discuss")}
                    icon={<MessageSquare className="w-4 h-4 mr-2" />}
                    label="Discuss"
                />

                <div className="ml-auto p-3">
                    <button className="text-sm text-gray-400 hover:text-white flex items-center">
                        View all submissions <span className="ml-1">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            className={`px-4 py-3 flex items-center text-sm transition-colors ${active ? "border-b-2 border-[#0070f3] text-[#0070f3]" : "text-gray-400 hover:text-white"
                }`}
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    );
}