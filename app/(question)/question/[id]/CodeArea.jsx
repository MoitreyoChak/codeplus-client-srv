import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { submissionApi } from "../../../../lib/backendApi.js";

const userId = "6807e1102ef63fe470ecddbc";

const CodeArea = ({
  testCases,
  questionTitle,
  setResult,
  tags,
  difficulty,
}) => {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");

  const params = useParams();
  const questionId = params.id;

  const getDefaultTemplate = (lang) => {
    console.log(lang);
    if (lang === "java") {
      return 'public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
    } else if (lang === "c") {
      return '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}';
    } else if (lang === "cpp") {
      return '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}';
    } else {
      return "";
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(language);
    if (savedCode && savedCode.trim() !== "") {
      setCode(savedCode);
    } else {
      setCode(getDefaultTemplate(language));
    }
  }, [language]);

  const saveToLocalStorage = () => {
    localStorage.setItem(language, code);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    saveToLocalStorage();
  };

  const submitSolution = async () => {
    try {
      console.log("Submitting testcases:", testCases);
      const response = await submissionApi.post(`/${userId}/${questionId}`, {
        language,
        sourceCode: code,
        testcases: testCases,
        questionTitle,
        problemSetterName: "Moitreyo",
        tags,
        difficulty,
      });
      console.log("Submission successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  const longPolling = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/code/fetchResults/${jobId}`
      );
      console.log("Polling response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during long polling:", error);
    }
  };

  const handleRunClick = async () => {
    console.log("Submitting code with language:", language);
    const { status, jobId, submissionId } = await submitSolution();
    if (status === "success") {
      let counter = 3;
      while (true) {
        console.log("Polling for jobId:", jobId);
        const result = await longPolling(jobId);
        if (result.status === "executed") {
          console.log("Final result:", result);
          setResult(result);
          break;
        }
        // Add a delay to avoid overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 2000));
        counter--;
        if (counter === 0) {
          console.log("Polling timed out.");
          break;
        }
      }
    } else {
      console.log("Submission failed:");
    }
  };

  return (
    <div className="h-full rounded-xl  flex flex-col bg-black/30">
      <div className="bg-black/30 rounded-t-xl  p-4 border-b border-gray-700 flex flex-shrink-0 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Language:</span>
          <select
            value={language}
            onChange={(e) => {
              console.log(e.target.value);
              setLanguage(e.target.value);
            }}
            className="bg-gray-900 text-gray-200 px-3 py-1 rounded border border-gray-700"
          >
            <option>java</option>
            <option>cpp</option>
            <option>c</option>
          </select>
        </div>
        <button
          onClick={handleRunClick}
          className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Run</span>
        </button>
      </div>
      {/* Code editor area */}
      <div className="flex-1 p-4">
        <textarea
          className="w-full h-full resize-none leading-relaxed bg-slate-800/30 text-gray-200 p-2 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 custom-scrollbar"
          placeholder={`Write your ${language} code here...`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4B5563 #1F2937",
          }}
          value={code}
          onChange={handleCodeChange}
        ></textarea>
      </div>
    </div>
  );
};

export default CodeArea;
