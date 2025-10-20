import Sidebar from "./components/Sidebar.js";
import Chat from "./components/Chat.js";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [newChat,setNewChat] = useState(true);
  const [pastConversations,setPastConversations] = useState(false);
  const [previousChats,setPreviousChat] = useState([[]]);
  const [currentChat,setCurrentChat] = useState([]);   

  useEffect(() => {
    setNewChat(newChat);
  }, [newChat])

  useEffect(() => {
    setPastConversations(pastConversations);
  }, [pastConversations])

  useEffect(() => {
    setPreviousChat(previousChats);
  }, [previousChats])

  useEffect(() => {
    setCurrentChat(currentChat);
  }, [currentChat])

  return (
    <div className="App">
      <Sidebar newChat={newChat} setNewChat={setNewChat} pastConversations={pastConversations} setPastConversations={setPastConversations}/>
      <Chat newChat={newChat} setNewChat={setNewChat} pastConversations={pastConversations} setPastConversations={setPastConversations} previousChat={previousChats} setPreviousChat={setPreviousChat} currentChat={currentChat} setCurrentChat={setCurrentChat}/>
    </div>
  );
}

export default App;
