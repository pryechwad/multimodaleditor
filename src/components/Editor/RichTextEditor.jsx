import React, { useRef, useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import MentionDropdown from "./MentionDropdown";
import useUndoRedo from "../../hooks/useUndoRedo";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";
import "./../../styles/editor.css";

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [mentionResults, setMentionResults] = useState([]);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [content, setContent, undo, redo] = useUndoRedo("");

  // Load saved content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, [setContent]);

  // Save content to localStorage on change
  const saveContent = () => {
    const currentContent = editorRef.current.innerHTML;
    setContent(currentContent);
    localStorage.setItem("editorContent", currentContent);
  };

  const handleMentionSearch = (query) => {
    const results = [
      { id: 1, name: "John Doe", role: "Developer" },
      { id: 2, name: "Jane Smith", role: "Designer" },
    ].filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    setMentionResults(results);
  };

  const handleMentionSelect = (user) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(`@${user.name} `));
    setMentionResults([]);
    saveContent();
  };

  const handleKeyDown = (e) => {
    if (e.key === "@") {
      const rect = editorRef.current.getBoundingClientRect();
      setMentionPosition({ top: rect.top + 20, left: rect.left });
      handleMentionSearch("");
    }
  };

  useKeyboardShortcuts({
    "Ctrl+b": () => document.execCommand("bold"),
    "Ctrl+i": () => document.execCommand("italic"),
    "Ctrl+u": () => document.execCommand("underline"),
    "/": () => console.log("Slash command triggered"),
  });

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
      <Toolbar editorRef={editorRef} undo={undo} redo={redo} />
      <div
        ref={editorRef}
        contentEditable
        className="editor-content border p-4 rounded min-h-[200px] focus:outline-none bg-white shadow-sm"
        onKeyDown={handleKeyDown}
        onInput={saveContent}
        dangerouslySetInnerHTML={{ __html: content }}
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