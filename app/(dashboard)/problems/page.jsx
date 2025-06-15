"use client";
import React, { useEffect, useState } from "react";
import HitProblemCards from "./HitProblemCards";
import Filter from "./Filter";
import SearchQuestion from "./SearchQuestion";
import ProblemsList from "./ProblemsList";
import axios from "axios";
import { GetAllQuestionsURL } from "../../../constant/apis";
import { questionApi } from "../../../lib/backendApi.js";

const Problems = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(GetAllQuestionsURL);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProblems();
  }, []);
  return (
    <div className="max-w-7xl w-full mx-auto p-3">
      <HitProblemCards />
      <div className="w-full grid grid-cols-7 gap-5">
        {/* filter   */}
        <Filter setQuestions={setQuestions} />
        <div className="flex flex-col col-span-5">
          <SearchQuestion />
          <ProblemsList questions={questions} setQuestions={setQuestions} />
        </div>
      </div>
    </div>
  );
};

export default Problems;
