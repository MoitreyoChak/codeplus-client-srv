import { useState, useEffect } from "react";
import { Send } from "lucide-react";

const CodeArea = () => {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  useEffect(() => {
    const savedCode = localStorage.getItem(language);
    if (savedCode && savedCode.trim() !== "") {
      setCode(savedCode);
    } else {
      setCode(getDefaultTemplate(language));
    }
  }, [language]);

  const getDefaultTemplate = (lang) => {
    switch (lang) {
      case "C++":
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}';
      case "Java":
        return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
      case "C":
        return '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}';
      default:
        return "";
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(language, code);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    saveToLocalStorage();
  };

  return (
    <div className="h-full rounded-xl  flex flex-col bg-black/30">
      <div className="bg-black/30 rounded-t-xl  p-4 border-b border-gray-700 flex flex-shrink-0 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-900 text-gray-200 px-3 py-1 rounded border border-gray-700"
          >
            <option>C++</option>
            <option>Java</option>
            <option>C</option>
          </select>
        </div>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded flex items-center space-x-2">
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
