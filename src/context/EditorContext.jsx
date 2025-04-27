import { createContext, useState, useEffect } from "react";

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [content, setContent] = useState("");

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem("editorContent", content);
  }, [content]);

  // Load from localStorage on first load
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  return (
    <EditorContext.Provider value={{ content, setContent }}>
      {children}
    </EditorContext.Provider>
  );
};
