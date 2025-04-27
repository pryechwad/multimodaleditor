import React from "react";
import RichTextEditor from "./components/Editor/RichTextEditor";

const App = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Custom Rich Text Editor</h1>
      <RichTextEditor />
    </div>
  );
};

export default App;