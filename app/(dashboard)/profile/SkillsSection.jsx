export default function SkillsSection() {
    return (
        <div className="bg-[#1e1e1e] rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Skills</h3>

            <SkillCategory category="Advanced" />
            <SkillCategory category="Intermediate" />
            <SkillCategory category="Fundamental" />
        </div>
    );
}

function SkillCategory({ category }) {
    return (
        <div className="mb-4">
            <div className="flex items-center mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm">{category}</span>
            </div>
            <p className="text-sm text-gray-400 ml-4">Not enough data</p>
        </div>
    );
}