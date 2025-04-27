import { useState } from "react";

const useUndoRedo = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [currentStep, setCurrentStep] = useState(0);

  const setState = (newState) => {
    const updatedHistory = history.slice(0, currentStep + 1);
    setHistory([...updatedHistory, newState]);
    setCurrentStep(updatedHistory.length);
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return [history[currentStep], setState, undo, redo];
};

export default useUndoRedo;