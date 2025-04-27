import React, { useRef, useState } from "react";
import Toolbar from "./Toolbar";
import MentionDropdown from "./MentionDropdown";
import "./../../styles/editor.css";

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [mentionResults, setMentionResults] = useState([]);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });

  const handleMentionSearch = (query) => {
    // Mock mention results
    const results = [
      { id: 1, name: "John Doe", role: "Developer" },
      { id: 2, name: "Jane Smith", role: "Designer" },
    ].filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    setMentionResults(results);
  };

  const handleMentionSelect = (user) => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(`@${user.name} `));
    setMentionResults([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "@") {
      const rect = editorRef.current.getBoundingClientRect();
      setMentionPosition({ top: rect.top + 20, left: rect.left });
      handleMentionSearch("");
    }
  };

  return (
    <div className="p-4">
      <Toolbar editorRef={editorRef} />
      <div
        ref={editorRef}
        contentEditable
        className="editor-content border p-4 rounded min-h-[200px] focus:outline-none"
        onKeyDown={handleKeyDown}
      ></div>
      <MentionDropdown
        results={mentionResults}
        onSelect={handleMentionSelect}
        position={mentionPosition}
      />
    </div>
  );
};

export default RichTextEditor;