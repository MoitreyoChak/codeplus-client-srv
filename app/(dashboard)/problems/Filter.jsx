"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Settings, X } from "lucide-react";
import { TiThumbsOk } from "react-icons/ti";
import { questionApi } from "../../../lib/backendApi.js";

const VerticalFilter = ({ setQuestions }) => {
  const [open, setOpen] = useState({
    tags: false,
    difficulty: false,
    status: false,
    lists: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    tags: [],
    difficulty: [],
    status: [],
    lists: [],
  });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filters = [
    {
      key: "lists",
      label: "Lists",
      options: ["Top 10 Questions", "Top DSA Questions"],
    },
    {
      key: "difficulty",
      label: "Difficulty",
      options: ["Easy", "Medium", "Hard"],
    },
    {
      key: "status",
      label: "Status",
      options: ["Solved", "Attempted", "Unattempted"],
    },
    {
      key: "tags",
      label: "Tags",
      options: [
        "array",
        "string",
        "hashmap",
        "linked-list",
        "stack",
        "queue",
        "heap",
        "priority-queue",
        "recursion",
        "backtracking",
        "dynamic-programming",
        "greedy",
        "sliding-window",
        "two-pointers",
        "binary-search",
        "searching",
        "sorting",
        "divide-and-conquer",
        "math",
        "bit-manipulation",
        "number-theory",
        "geometry",
        "graph",
        "bfs",
        "dfs",
        "topological-sort",
        "union-find",
        "disjoint-set",
        "shortest-path",
        "dijkstra",
        "bellman-ford",
        "floyd-warshall",
        "minimum-spanning-tree",
        "kruskal",
        "prim",
        "tree",
        "binary-tree",
        "binary-search-tree",
        "segment-tree",
        "fenwick-tree",
        "trie",
        "hashing",
        "monotonic-stack",
        "monotonic-queue",
        "intervals",
        "greedy-intervals",
        "matrix",
        "prefix-sum",
        "suffix-array",
        "rolling-hash",
        "combinatorics",
        "pointers",
        "game-theory",
        "state-space-search",
        "memoization",
        "modular-arithmetic",
        "implementation",
        "simulation",
        "bitmasking",
        "recursion-tree",
      ],
    },
  ];

  const handleOptionToggle = (filterKey, option) => {
    setSelectedFilters((prev) => {
      const selected = prev[filterKey];
      const updated = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];

      return { ...prev, [filterKey]: updated };
    });
  };

  const clearFilter = (filterKey, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey].filter((item) => item !== option),
    }));
  };

  const submitFilters = async () => {
    try {
      const filterObject = {
        difficulty: selectedFilters.difficulty,
        tags: selectedFilters.tags,
      };
      console.log("Submitting filters:", filterObject);
      const response = await questionApi.post(`/filter`, filterObject);
      if (response.data.status === "success") {
        console.log("Filtered questions:", response.data.result);
        setQuestions(response.data.result);
      } else console.error("Error in submission:", response.data);
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  //   console.log("Filters Applied:", selectedFilters);

  return (
    <div className="p-4 h-fit text-gray-400 col-span-2 border border-primary space-y-4">
      {/* Filter Categories */}
      {filters.map(({ key, label, options }) => (
        <div key={key} className="space-y-1">
          <div
            className="flex items-center justify-between bg-black/30 rounded px-4 py-2 hover:bg-black/40 cursor-pointer"
            onClick={() => toggle(key)}
          >
            <span>{label}</span>
            {open[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {open[key] && (
            <div className="ml-4 space-y-1 text-sm text-gray-300">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex px-2 py-1 mr-2 rounded gap-1 cursor-pointer items-center hover:bg-black/20 ${
                    selectedFilters[key].includes(option)
                      ? "bg-white/10 text-white"
                      : ""
                  }`}
                  onClick={() => handleOptionToggle(key, option)}
                >
                  <div
                    className={`p-[1px] border ${
                      selectedFilters[key].includes(option)
                        ? "border-cyan-400"
                        : "border-gray-400/50"
                    }`}
                  >
                    <TiThumbsOk
                      className={`text-xs text-cyan-400 ${
                        selectedFilters[key].includes(option)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>
                  <p>{option}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Selected Filters Summary */}
      <div className="pt-4 px-1 space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <p>Selected Filters</p>
          <button
            className={`border border-gray-400/60 py-2 px-2 text-black
                    ${
                      Object.entries(selectedFilters).filter(
                        ([key, values]) => {
                          if (Array.isArray(values) && values.length > 0)
                            return true;
                        }
                      ) && "bg-blue-300"
                    }`}
            onClick={submitFilters}
          >
            Apply Filters
          </button>
        </div>
        {Object.entries(selectedFilters).map(([key, values]) =>
          Array.isArray(values) && values.length > 0 ? (
            <div key={key} className="flex flex-wrap gap-2">
              {values.map((val) => (
                <span
                  key={val}
                  className="bg-black/30 px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {val}
                  <X
                    size={12}
                    className="cursor-pointer"
                    onClick={() => clearFilter(key, val)}
                  />
                </span>
              ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default VerticalFilter;
