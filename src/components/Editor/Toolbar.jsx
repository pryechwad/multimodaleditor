import React from "react";

const Toolbar = ({ editorRef, undo, redo }) => {
  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="flex space-x-2 mb-4 bg-gray-100 p-2 rounded shadow-sm">
      <button
        onClick={undo}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Undo
      </button>
      <button
        onClick={redo}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Redo
      </button>
      <button
        onClick={() => applyFormat("bold")}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Bold
      </button>
      <button
        onClick={() => applyFormat("italic")}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Italic
      </button>
      <button
        onClick={() => applyFormat("underline")}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Underline
      </button>
      <button
        onClick={() => applyFormat("insertOrderedList")}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Numbered List
      </button>
      <button
        onClick={() => applyFormat("insertUnorderedList")}
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Bullet List
      </button>
    </div>
  );
};

export default Toolbar;