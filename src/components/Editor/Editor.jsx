import React, { useContext, useRef, useEffect } from "react";
import { EditorContext } from "../../context/EditorContext";

const Editor = () => {
  const context = useContext(EditorContext);
  const content = context?.content || "";
  const setContent = context?.setContent || (() => {});

  const editorRef = useRef(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editorContent", content);
  }, [content]);

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
  };

  const applyFormatting = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus(); // Ensure the editor is focused
      try {
        document.execCommand(command, false, value); // Apply the formatting command
        setContent(editorRef.current.innerHTML); // Update the state with the new content
      } catch (error) {
        console.error(`Error applying command ${command}:`, error);
      }
    }
  };

  return (
    <div
      className="editor-container"
      style={{
        maxWidth: "100%",
        width: "90%",
        margin: "0 auto",
        padding: "10px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="toolbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => applyFormatting("bold")}
          style={{ padding: "5px 10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          Bold
        </button>
        <button
          onClick={() => applyFormatting("italic")}
          style={{ padding: "5px 10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          Italic
        </button>
        <button
          onClick={() => applyFormatting("underline")}
          style={{ padding: "5px 10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          Underline
        </button>
        <select
          onChange={(e) => applyFormatting("fontName", e.target.value)}
          style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
        <select
          onChange={(e) => applyFormatting("fontSize", e.target.value)}
          style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
        </select>
        <input
          type="color"
          onChange={(e) => applyFormatting("foreColor", e.target.value)}
          title="Text Color"
          style={{ width: "40px", height: "30px", border: "none" }}
        />
        <input
          type="color"
          onChange={(e) => applyFormatting("hiliteColor", e.target.value)}
          title="Highlight Color"
          style={{ width: "40px", height: "30px", border: "none" }}
        />
      </div>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        style={{
          minHeight: "300px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-word",
        }}
      ></div>
    </div>
  );
};

export default Editor;
