import Sidebar from "./components/Sidebar.js";
import Chat from "./components/Chat.js";
import PreviousChat from "./components/PreviousChat.js";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [newChat, setNewChat] = useState(true);
  const [previousChats, setPreviousChat] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);   

  const handleNewChat = () => {
    setCurrentChat([]);
    setNewChat(true);
    localStorage.setItem("currentChat", JSON.stringify([]));
  };

  useEffect(() => {
    // Load from localStorage on initial render
    const savedCurrentChat = localStorage.getItem("currentChat");
    const savedPreviousChats = localStorage.getItem("previousChats");
    
    console.log("Loading from localStorage:", { savedCurrentChat, savedPreviousChats });
    
    if (savedCurrentChat) {
      const parsedChat = JSON.parse(savedCurrentChat);
      setCurrentChat(parsedChat);
      if (parsedChat.length > 0) {
        setNewChat(false);
      }
    }
    
    if (savedPreviousChats) {
      const parsedPreviousChats = JSON.parse(savedPreviousChats);
      setPreviousChat(parsedPreviousChats);
      console.log("Loaded previous chats:", parsedPreviousChats);
    }
  }, []);

  // Update localStorage whenever chats change
  useEffect(() => {
    if (currentChat.length > 0) {
      localStorage.setItem("currentChat", JSON.stringify(currentChat));
    }
  }, [currentChat]);

  useEffect(() => {
    if (previousChats.length > 0) {
      localStorage.setItem("previousChats", JSON.stringify(previousChats));
      console.log("Saved previous chats:", previousChats);
    }
  }, [previousChats]);

  return (
    <Router>
      <div className="App">
        <Sidebar onNewChat={handleNewChat} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Chat 
                newChat={newChat}
                setNewChat={setNewChat}
                previousChat={previousChats}
                setPreviousChat={setPreviousChat}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                onNewChat={handleNewChat}
              />
            } 
          />
          <Route 
            path="/history" 
            element={
              <PreviousChat 
                previousChats={previousChats}
                setCurrentChat={setCurrentChat}
                onNewChat={handleNewChat}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;