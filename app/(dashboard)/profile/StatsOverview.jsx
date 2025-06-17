import { CircularProgress } from "./CircularProgress";

export default function StatsOverview({ user }) {
  // user = {"difficultyCategory": {
  //     "Easy": {
  //         "solved": 1
  //     },
  //     "Medium": {
  //         "solved": 1
  //     }
  // },}

  return (
    <div className="bg-[#212121] rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Circular progress */}
        <div className="flex flex-col items-center justify-center">
          <CircularProgress user={user} />
          <p className="mt-2 text-sm text-gray-400">0 Attempting</p>
        </div>

        {/* Difficulty breakdown */}
        <div className="flex flex-col space-y-2">
          <div className="mb-1">
            <div className="flex justify-between">
              <span className="text-sm text-cyan-400">Easy</span>
              <span className="text-sm text-gray-400">
                {user.difficultyCategory?.Easy?.solved || 0}/
                {user.difficultyCategory?.Easy?.total || 0}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div
                className="bg-cyan-400 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>

          <div className="mb-1">
            <div className="flex justify-between">
              <span className="text-sm text-yellow-500">Med.</span>
              <span className="text-sm text-gray-400">
                {user.difficultyCategory?.Medium?.solved || 0}/
                {user.difficultyCategory?.Medium?.total || 0}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>

          <div className="mb-1">
            <div className="flex justify-between">
              <span className="text-sm text-red-500">Hard</span>
              <span className="text-sm text-gray-400">
                {user.difficultyCategory?.Hard?.solved || 0}/
                {user.difficultyCategory?.Hard?.total || 0}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm text-gray-300">Badges</span>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
          <div className="bg-[#282828] p-3 rounded-lg mt-2">
            <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded mb-1">
              Locked Badge
            </span>
            <p className="text-sm">Apr LeetCoding Challenge</p>
          </div>
        </div>
      </div>
    </div>
  );
}
