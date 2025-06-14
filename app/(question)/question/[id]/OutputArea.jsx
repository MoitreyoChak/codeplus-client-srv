import React from "react";

const OutputArea = ({ result }) => {
  if (!result) {
    return (
      <div className="p-4">
        <div className="text-gray-500">No results available</div>
      </div>
    );
  }
  // const result = {
  //   status: "executed",
  //   results: [
  //     {
  //       _id: "684d747bb11565d026bb246c",
  //       parameters: [
  //         {
  //           _id: "684d747bb11565d026bb246d",
  //           key: "n",
  //           value: "4",
  //           type: "number",
  //         },
  //         {
  //           _id: "684d747bb11565d026bb246e",
  //           key: "nums",
  //           value: "[2,7,11,15]",
  //           type: "array",
  //         },
  //         {
  //           _id: "684d747bb11565d026bb246f",
  //           key: "target",
  //           value: "9",
  //           type: "number",
  //         },
  //       ],
  //       expectedOutput: "0 1",
  //       actualOutput: "0 1",
  //       isCorrect: true,
  //       status: "passed",
  //     },
  //     {
  //       _id: "684d747bb11565d026bb2470",
  //       parameters: [
  //         {
  //           _id: "684d747bb11565d026bb2471",
  //           key: "n",
  //           value: "4",
  //           type: "number",
  //         },
  //         {
  //           _id: "684d747bb11565d026bb2472",
  //           key: "nums",
  //           value: "[3,10,2,8]",
  //           type: "array",
  //         },
  //         {
  //           _id: "684d747bb11565d026bb2473",
  //           key: "target",
  //           value: "5",
  //           type: "number",
  //         },
  //       ],
  //       expectedOutput: "0 2",
  //       actualOutput: "0 2",
  //       isCorrect: true,
  //       status: "passed",
  //     },
  //   ],
  //   verdict: "AC",
  // };
  const { status, results, verdict } = result;
  // const verdict = "AC"; //AC, TLE, WA
  const errorMessage = "Error occured at line no: 39";
  return (
    <div className="p-4">
      <div className="">
        <div
          className={`${
            verdict == "AC"
              ? "text-green-500"
              : verdict == "TLE"
              ? "text-amber-400"
              : "text-red-600"
          } py-0.5 px-2 bg-gray-200/10 rounded w-fit mb-3`}
        >
          {verdict}
        </div>
        {verdict != "AC" && (
          <div
            className={`p-2 bg-black/30 mb-2 ${
              verdict == "TLE" ? "text-amber-400" : "text-red-600"
            }`}
          >
            {errorMessage}
          </div>
        )}
      </div>
      {/* "results": [
        {
            "_id": "684d5172b11565d026bb2450",
            "parameters": [
                {
                    "_id": "684d5172b11565d026bb2451",
                    "key": "message",
                    "value": "\"Hello, World!\"",
                    "type": "string"
                }
            ],
            "expectedOutput": "Hello, World!",
            "actualOutput": "Hello, World!",
            "isCorrect": true,
            "status": "passed"
        }
    ], */}
      <div className="flex flex-col gap-5 ">
        {results.map((ele, i) => (
          <div className="flex gap-5 items-center border-b pb-4">
            <div
              className=" h-fit w-28 bg-slate-700/40 shadow shadow-black/50 px-4 py-0.5 flex justify-center rounded cursor-pointer"
              key={i}
            >
              Testcase {i + 1}
            </div>
            {/* loop over the parameters array of results and show the parameters for that test case*/}
            <div className="flex flex-col gap-2">
              {ele.parameters.map((param, j) => (
                <div key={j} className="bg-black/30 px-2 py-1 rounded text-xs">
                  {param.key}: {param.value}
                </div>
              ))}
            </div>
            <div className="flex gap-2 w-full">
              <div className="w-1/2 flex flex-col gap-2">
                <p className="text-xs">Actual Output</p>
                <div className="w-full bg-black/30 px-2 py-1">
                  {ele.actualOutput}
                </div>
              </div>

              <div className="w-1/2 flex flex-col gap-2">
                <p className="text-xs">Expected Output</p>
                <div className="w-full bg-black/30 px-2 py-1">
                  {ele.expectedOutput}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
};

export default OutputArea;
