import Sidebar from "./components/Sidebar.js";
import Chat from "./components/Chat.js";
import PreviousChat from "./components/PreviousChat.js";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [newChat, setNewChat] = useState(true);
  const [previousChats, setPreviousChat] = useState([[]]);
  const [currentChat, setCurrentChat] = useState([]);   

  const handleNewChat = () => {
    setCurrentChat([]);
    setNewChat(true);
    localStorage.setItem("chat", JSON.stringify([]));
  };

  useEffect(() => {
    const savedChat = localStorage.getItem("chat");
    const savedPrevChats = localStorage.getItem("prev-chats");
    
    if (savedChat) {
      const parsedChat = JSON.parse(savedChat);
      setCurrentChat(parsedChat);
      if (parsedChat.length > 0) {
        setNewChat(false);
      }
    }
    if (savedPrevChats) {
      setPreviousChat(JSON.parse(savedPrevChats));
    }
  }, []);

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