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
  }, [setCurrentChat, setNewChat, setPreviousChat]);

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
      text: check ? check.response : "As an AI language model, I don't have the details",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedCurrentChat = [...currentChat, userMsg, botMsg];
    setCurrentChat(updatedCurrentChat);
    setCurrentMessage("");

    let updatedPrevious = [...previousChat];
    
    if (updatedPrevious.length === 0 || currentChat.length === 0) {
      updatedPrevious.push([userMsg, botMsg]);
    } else {
      updatedPrevious[updatedPrevious.length - 1] = [
        ...updatedPrevious[updatedPrevious.length - 1],
        userMsg,
        botMsg
      ];
    }

    setPreviousChat(updatedPrevious);

    localStorage.setItem("chat", JSON.stringify(updatedCurrentChat));
    localStorage.setItem("prev-chats", JSON.stringify(updatedPrevious));
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

      <div className="input-section">
        <input
          type="text"
          value={message}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(message)}
          placeholder="Message Bot AI..."
        />
        <button id="send" onClick={() => handleSendMessage(message)} type="submit">
          Send
        </button>
        <Link to="/" onClick={onNewChat} id="save">
          New Chat
        </Link>
      </div>
    </div>
  );
}