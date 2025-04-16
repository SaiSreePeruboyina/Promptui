
// "use client";
// import React, { useRef, useState, useEffect } from "react";

// export default function Home() {
//   const [codeTab, setCodeTab] = useState(true);
//   const sidebarRef = useRef(null);
//   const resizerRef = useRef(null);
//   const [sidebarWidth, setSidebarWidth] = useState(260);
//   const [isResizing, setIsResizing] = useState(false);

//   const [language, setLanguage] = useState("React");
//   const [prompt, setPrompt] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [previewContent, setPreviewContent] = useState("");

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!isResizing) return;
//       const newWidth = e.clientX;
//       if (newWidth >= 200 && newWidth <= 500) {
//         setSidebarWidth(newWidth);
//       }
//     };

//     const handleMouseUp = () => setIsResizing(false);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isResizing]);
//   const handleGenerate = async () => {
//     try {
//       const res = await fetch("/api/groq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt: `Generate a ${language} UI based on: ${prompt}`,
//         }),
//       });
  
//       const data = await res.json();
//       console.log("✅ Groq API response:", data);
  
//       // If your API returns `generatedCode`, use that
//       const rawCode = data.generatedCode || "";
//       console.log("💡 Raw code:", rawCode);
  
//       if (!rawCode.trim()) {
//         alert("Groq didn't return code.");
//         return;
//       }
  
//       // Clean it if wrapped in code block
//       const cleanCode = rawCode.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
//       setGeneratedCode(cleanCode);
//       setPreviewContent(language === "Html" ? cleanCode : "Preview not supported");
  
//     } catch (err) {
//       console.error("❌ Error calling Groq API:", err);
//       alert("Failed to generate code.");
//     }
//   };
  

//   const handleCopy = () => {
//     navigator.clipboard.writeText(generatedCode);
//     alert("Code copied to clipboard!");
//   };

//   return (
//     <div className="flex h-screen text-white bg-gray-950 font-sans">
//       {/* Sidebar */}
//       <aside
//         ref={sidebarRef}
//         style={{ width: `${sidebarWidth}px` }}
//         className="p-4 bg-gray-900 border-r border-gray-800 flex flex-col"
//       >
//         <div className="text-lg font-bold mb-6 flex items-center gap-2">
//           <div className="bg-purple-600 px-2 py-1 rounded text-sm">UI</div>
//           UI Generator
//         </div>

//         <label className="text-sm mb-2 font-medium">Language:</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mb-4 text-white"
//         >
//           <option>React</option>
//           <option>Flutter</option>
//           <option>Html</option>
//         </select>

//         <label className="text-sm font-medium mb-2">Describe the UI you want to create:</label>
//         <textarea
//           placeholder="Describe the UI component or page you want to generate..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="bg-gray-800 border border-gray-700 rounded p-2 text-sm resize-none h-24 mb-4"
//         />

//         <button
//           onClick={handleGenerate}
//           className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded mb-4"
//         >
//           Generate UI
//         </button>

//         <div className="overflow-y-auto">
//           <h3 className="text-sm font-semibold mb-2">Components</h3>
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             {["Button", "Input", "Card", "Table", "List", "Image"].map((item) => (
//               <button
//                 key={item}
//                 className="bg-gray-800 p-2 rounded border border-gray-700"
//                 onClick={() => setPrompt((prev) => `${prev} Add a ${item}. `)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Resizer */}
//       <div
//         ref={resizerRef}
//         onMouseDown={() => setIsResizing(true)}
//         className="w-2 cursor-col-resize bg-gray-700 hover:bg-gray-600 transition"
//       />

//       {/* Main Panel */}
//       <main className="flex-1 flex flex-col">
//         {/* Top Bar Tabs */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//           <div className="flex gap-4">
//             <button
//               onClick={() => setCodeTab(true)}
//               className={`px-4 py-1 rounded ${codeTab ? "bg-purple-600" : "bg-gray-800"}`}
//             >
//               Code
//             </button>
//             <button
//               onClick={() => setCodeTab(false)}
//               className={`px-4 py-1 rounded ${!codeTab ? "bg-purple-600" : "bg-gray-800"}`}
//             >
//               Preview
//             </button>
//           </div>
//           <div className="flex gap-2">
//             <button className="bg-gray-800 px-3 py-1 rounded border border-gray-700">
//               Save
//             </button>
//             <button
//               onClick={handleCopy}
//               className="bg-gray-800 px-3 py-1 rounded border border-gray-700"
//             >
//               Copy
//             </button>
//           </div>
//         </div>

//         {/* Main Display */}
//         <div className="flex-1 p-6 overflow-auto bg-gray-950">
//           {generatedCode ? (
//             codeTab ? (
//               <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto whitespace-pre-wrap">
//                 {generatedCode}
//               </pre>
//             ) : (
//               <div className="bg-white text-black p-4 rounded shadow" dangerouslySetInnerHTML={{ __html: previewContent }} />
//             )
//           ) : (
//             <div className="text-purple-500 text-center mt-20">
//               No Code Generated Yet
//               <br />
//               <span className="text-sm text-gray-400">
//                 Enter a prompt or drag components from the panel to generate code
//               </span>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";
import React, { useRef, useState, useEffect } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"; // Import react-live components

export default function Home() {
  const [codeTab, setCodeTab] = useState(true);
  const sidebarRef = useRef(null);
  const resizerRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);

  const [language, setLanguage] = useState("React");
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleGenerate = async () => {
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate a ${language} UI based on: ${prompt}`,
        }),
      });

      const data = await res.json();
      console.log("✅ Groq API response:", data);

      const rawCode = data.generatedCode || "";
      console.log("💡 Raw code:", rawCode);

      if (!rawCode.trim()) {
        alert("Groq didn't return code.");
        return;
      }

      const cleanCode = rawCode.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
      setGeneratedCode(cleanCode);
      setPreviewContent(language === "React" ? cleanCode : "Preview not supported");

    } catch (err) {
      console.error("❌ Error calling Groq API:", err);
      alert("Failed to generate code.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="flex h-screen text-white bg-gray-950 font-sans">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px` }}
        className="p-4 bg-gray-900 border-r border-gray-800 flex flex-col"
      >
        <div className="text-lg font-bold mb-6 flex items-center gap-2">
          <div className="bg-purple-600 px-2 py-1 rounded text-sm">UI</div>
          UI Generator
        </div>

        <label className="text-sm mb-2 font-medium">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mb-4 text-white"
        >
          <option>React</option>
          <option>Flutter</option>
          <option>Html</option>
        </select>

        <label className="text-sm font-medium mb-2">Describe the UI you want to create:</label>
        <textarea
          placeholder="Describe the UI component or page you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded p-2 text-sm resize-none h-24 mb-4"
        />

        <button
          onClick={handleGenerate}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded mb-4"
        >
          Generate UI
        </button>

        <div className="overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2">Components</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Button", "Input", "Card", "Table", "List", "Image"].map((item) => (
              <button
                key={item}
                className="bg-gray-800 p-2 rounded border border-gray-700"
                onClick={() => setPrompt((prev) => `${prev} Add a ${item}. `)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Resizer */}
      <div
        ref={resizerRef}
        onMouseDown={() => setIsResizing(true)}
        className="w-2 cursor-col-resize bg-gray-700 hover:bg-gray-600 transition"
      />

      {/* Main Panel */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar Tabs */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex gap-4">
            <button
              onClick={() => setCodeTab(true)}
              className={`px-4 py-1 rounded ${codeTab ? "bg-purple-600" : "bg-gray-800"}`}
            >
              Code
            </button>
            <button
              onClick={() => setCodeTab(false)}
              className={`px-4 py-1 rounded ${!codeTab ? "bg-purple-600" : "bg-gray-800"}`}
            >
              Preview
            </button>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-800 px-3 py-1 rounded border border-gray-700">
              Save
            </button>
            <button
              onClick={handleCopy}
              className="bg-gray-800 px-3 py-1 rounded border border-gray-700"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Main Display */}
        <div className="flex-1 p-6 overflow-auto bg-gray-950">
          {generatedCode ? (
            codeTab ? (
              <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto whitespace-pre-wrap">
                {generatedCode}
              </pre>
            ) : (
              // Preview logic based on language selected
              language === "React" ? (
                <LiveProvider code={generatedCode}>
                  <LiveEditor className="bg-gray-900 text-white p-4 rounded mb-4" />
                  <LiveError />
                  <LivePreview className="bg-gray-100 p-4 rounded shadow-md" />
                </LiveProvider>
              ) : language === "Flutter" ? (
                <div className="bg-white text-black p-4 rounded shadow">
                  {/* You can integrate a Flutter-specific preview system here */}
                  <p>Flutter code preview is not yet supported in this app.</p>
                </div>
              ) : language === "Html" ? (
                <div className="bg-white text-black p-4 rounded shadow">
                  <div dangerouslySetInnerHTML={{ __html: generatedCode }} />
                </div>
              ) : null
            )
          ) : (
            <div className="text-purple-500 text-center mt-20">
              No Code Generated Yet
              <br />
              <span className="text-sm text-gray-400">
                Enter a prompt or drag components from the panel to generate code
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
