import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Chat.css";
import pfp from "../assets/images/chat-pfp.png";
import botData from "../sampleData.js";
import user from "../assets/images/user.png";

export default function Chat({
  newChat,
  setNewChat,
  previousChat,
  setPreviousChat,
  currentChat,
  setCurrentChat,
  onNewChat
}) {
  const [message, setCurrentMessage] = useState("");

  useEffect(() => {
    const savedCurrentChat = localStorage.getItem("currentChat");
    const savedPreviousChats = localStorage.getItem("previousChats");
    
    if (savedCurrentChat) {
      const parsedChat = JSON.parse(savedCurrentChat);
      setCurrentChat(parsedChat);
      if (parsedChat.length > 0) {
        setNewChat(false);
      }
    }
  }, [setCurrentChat, setNewChat]);

  const handleSendMessage = (msg) => {
    if (!msg || !msg.trim()) return;

    setNewChat(false);

    const userMsg = {
      sender: "user",
      text: msg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const check = botData.find(
      (ele) => ele.question && ele.question.trim().toLowerCase() === msg.trim().toLowerCase()
    );

    const botMsg = {
      sender: "bot",
      text: check ? check.response : "Sorry, Did not understand your query!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedCurrentChat = [...currentChat, userMsg, botMsg];
    setCurrentChat(updatedCurrentChat);

    // Update previous chats - create a new conversation if this is the first message
    let updatedPreviousChats = [...previousChat];
    
    if (currentChat.length === 0) {
      // Starting a new conversation
      updatedPreviousChats.push([userMsg, botMsg]);
    } else {
      // Continuing existing conversation - update the last one
      if (updatedPreviousChats.length > 0) {
        updatedPreviousChats[updatedPreviousChats.length - 1] = [
          ...updatedPreviousChats[updatedPreviousChats.length - 1],
          userMsg,
          botMsg
        ];
      } else {
        // No previous chats yet, create first one
        updatedPreviousChats.push([userMsg, botMsg]);
      }
    }

    setPreviousChat(updatedPreviousChats);
    setCurrentMessage("");

    // Save to localStorage
    localStorage.setItem("currentChat", JSON.stringify(updatedCurrentChat));
    localStorage.setItem("previousChats", JSON.stringify(updatedPreviousChats));
    
    console.log("Saved chat data:", {
      currentChat: updatedCurrentChat,
      previousChats: updatedPreviousChats
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      handleSendMessage(message);
    }
  };

  return (
    <div className="chat-section">
      {newChat ? (
        <header className="welcome">
          <h1 className="welcome-heading">Bot AI</h1>
          <div className="welcome-child">
            <h1>How can I Help You Today?</h1>
            <img src={pfp} alt="pfp" />
          </div>

          <div className="welcome-questions">
            {[
              "Hi, what is the weather",
              "Hi, what is my location",
              "Hi, what is temperature",
              "Hi, how are you",
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                className={`question ${idx === 2 ? "question-3" : ""}`}
                onClick={() => handleSendMessage(q)}
              >
                <h3>{q}</h3>
                <p>Get immediate AI generated response</p>
              </button>
            ))}
          </div>
        </header>
      ) : (
        <div className="current-chats">
          <div className="chat-header">
            <Link to="/" onClick={onNewChat} className="new-chat-button">
              + New Chat
            </Link>
          </div>
          {currentChat.map((ele, idx) => (
            <div className="chat" key={idx}>
              <img src={ele.sender === "user" ? user : pfp} alt={ele.sender} />
              <div className="msg">
                <p>{ele.text}</p>
                <span className="time">
                  {ele.sender === "user" ? "You" : "Soul AI"} • {ele.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-section">
        <input
          type="text"
          value={message}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Message Bot AI..."
        />
        <button id="send" type="submit">
          Send
        </button>
        <Link to="/" onClick={onNewChat} id="save">
          New Chat
        </Link>
      </form>
    </div>
  );
}