import Image from "next/image";

export default function ProfileHeader() {
    return (
        <div className="bg-[#1e1e1e] rounded-lg p-5">
            <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                        src="https://i.pinimg.com/736x/7e/c0/20/7ec0209a446f3a2914e416d086387585.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-green-400">R4T5g85JaC</h2>
                    <p className="text-sm text-gray-400">R4T5g85JaC</p>
                    <div className="mt-1">
                        <span className="text-sm">Rank </span>
                        <span className="text-sm font-semibold">~5,000,000</span>
                    </div>
                </div>
            </div>

            <button
                className="w-full mt-4 px-4 py-2 bg-transparent border border-green-600 text-green-400 rounded-md hover:bg-green-900/20 hover:text-green-300 transition-colors"
            >
                Edit Profile
            </button>
        </div>
    );
}