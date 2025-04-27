import React, { useState, useEffect } from 'react';
import { EditorContext } from './EditorContext.jsx'; // Make sure the path is correct

export const EditorProvider = ({ children }) => {
  const [content, setContentState] = useState('');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Load saved content from localStorage when the app starts
  useEffect(() => {
    const savedContent = localStorage.getItem('editor-content');
    if (savedContent) {
      setContentState(savedContent);
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('editor-content', content);
  }, [content]);

  const updateContent = (newContent) => {
    setHistory((prev) => [...prev, content]); // Save current content to history
    setContentState(newContent);               // Update with new content
    setRedoStack([]);                          // Clear redo stack
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousContent = history[history.length - 1];
    setRedoStack((prev) => [content, ...prev]);
    setContentState(previousContent);
    setHistory((prev) => prev.slice(0, -1)); // Remove last item
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextContent = redoStack[0];
    setHistory((prev) => [...prev, content]);
    setContentState(nextContent);
    setRedoStack((prev) => prev.slice(1)); // Remove first item
  };

  return (
    <EditorContext.Provider value={{ content, setContent: updateContent, undo, redo }}>
      {children}
    </EditorContext.Provider>
  );
};
