import React, { useState } from "react";
import './App.css';
import History from './components/History';
import Prompt from './components/Prompt';

function App() {
  const user_id = "ambaram";
  const [history, setHistory] = useState([]);

  // Add new prompt and images to the top of history
  const addNewPromptToHistory = (newEntry) => {
    console.log("New entry being added:", newEntry);
    setHistory((prevHistory) => [newEntry, ...prevHistory]); // Add new entry to top
  };

  return (
    <>
      <Prompt user_id={user_id} addNewPromptToHistory={addNewPromptToHistory} />
      <History user_id={user_id} history={history} setHistory={setHistory} />
    </>
  );
}

export default App;
