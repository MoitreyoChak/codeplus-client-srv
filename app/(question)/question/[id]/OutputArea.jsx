import React from "react";

const OutputArea = ({ output }) => {
  const result = "Accepted"; //Accepted, TLE, WA
  const errorMessage = "Error occured at line no: 39";
  return (
    <div className="p-4">
      <div className="">
        <div
          className={`${
            result == "Accepted"
              ? "text-green-500"
              : result == "TLE"
              ? "text-amber-400"
              : "text-red-600"
          } py-0.5 px-2 bg-gray-200/10 rounded w-fit mb-3`}
        >
          {result}
        </div>
        {result != "Accepted" && (
          <div
            className={`p-2 bg-black/30 mb-2 ${
              result == "TLE" ? "text-amber-400" : "text-red-600"
            }`}
          >
            {errorMessage}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 ">
        {output.map((ele, i) => (
          <div className="flex gap-5 items-center border-b pb-4">
            <div
              className=" h-fit w-28 bg-slate-700/40 shadow shadow-black/50 px-4 py-0.5 flex justify-center rounded cursor-pointer"
              key={i}
            >
              input {i + 1}
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
