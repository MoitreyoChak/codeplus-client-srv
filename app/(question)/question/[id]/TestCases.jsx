import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";

const TestCases = ({ TCs }) => {
  const [selectedCase, setSelectedCase] = useState(0);
  const [testCases, setTestCases] = useState(TCs);

  useEffect(() => {
    setTestCases(TCs);
  }, [TCs]);

  //   testcases: [
  //   [
  //     {
  //       key: "nums",
  //       label: "Array (nums)",
  //       val: "[2,7,11,15]",
  //       type: "array",
  //     },
  //     {
  //       key: "target",
  //       label: "Target",
  //       val: "9",
  //       type: "number",
  //     },
  //   { expectedOutput: "[0,1]" },
  //   ],
  //   [
  //     {
  //       key: "nums",
  //       label: "Array (nums)",
  //       placeholder: "[2,7,11,15]",
  //       type: "array",
  //     },
  //     { key: "target", label: "Target", placeholder: "13", type: "number" },
  //{ expectedOutput: "[0,1]" },
  //   ],
  // ],

  const addNewTestCase = () => {
    const newTestCase = [
      {
        key: testCases[0][0].key,
        label: testCases[0][0].label,
        val: testCases[0][0].val,
        type: testCases[0][0].type,
      },
      {
        key: testCases[0][1].key,
        label: testCases[0][1].label,
        val: testCases[0][1].val,
        type: testCases[0][1].type,
      },
      { expectedOutput: testCases[0][1].expectedOutput },
    ];

    setTestCases([...testCases, newTestCase]);
    setSelectedCase(testCases.length);
  };

  const deleteTestCase = (index, e) => {
    e.stopPropagation();
    const prevLength = testCases.length;
    setTestCases(
      testCases.filter((ele, i) => {
        if (i == index) return false;
        return true;
      })
    );
    if (selectedCase > prevLength - 2) {
      setSelectedCase(prevLength - 2);
      console.log(prevLength - 2);
      console.log(testCases[prevLength - 2]);
    }
  };

  const updateTestCase = (value) => {
    const newTestCases = [...testCases];
    newTestCases[selectedCase] = value;
    setTestCases(newTestCases);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">Testcases</h3>
        <div className="ml-4 flex space-x-2">
          {testCases?.map((_, index) => (
            <button
              key={index}
              className={`flex items-center pl-4 pr-3 py-1 rounded ${
                selectedCase === index
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => {
                setSelectedCase(index);
              }}
            >
              Case {index + 1}
              <div
                className="text-pink-500 hover:text-red-600 ml-1 text-sm"
                onClick={(e) => deleteTestCase(index, e)}
              >
                <FaTrash />
              </div>
            </button>
          ))}
          <button
            onClick={addNewTestCase}
            className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 flex items-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          {testCases?.[selectedCase]?.map((tc, index) => {
            if (index === 2) {
              return;
            }

            return (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {tc.label}
                </label>
                <input
                  type={tc.type}
                  value={testCases[selectedCase][index].val}
                  onChange={(e) => {
                    const newTestCases = [...testCases];
                    newTestCases[selectedCase][index] = {
                      ...newTestCases[selectedCase][index],
                      val:
                        tc.type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    };
                    setTestCases(newTestCases);
                  }}
                  className="w-full bg-gray-900 text-gray-200 px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestCases;
