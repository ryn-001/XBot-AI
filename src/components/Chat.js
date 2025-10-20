import { useEffect, useState } from "react";
import "./Chat.css";
import pfp from "../assets/images/chat-pfp.png";
import botData from "../sampleData.js";
import user from "../assets/images/user.png";

export default function Chat({
  newChat,
  setNewChat,
  pastConversations,
  setPastConversations,
  previousChat,
  setPreviousChat,
  currentChat,
  setCurrentChat
}) {
  const [message, setCurrentMessage] = useState("");

  useEffect(() => {
    setCurrentChat(JSON.parse(localStorage.getItem("chat")) || []);
    setPreviousChat(JSON.parse(localStorage.getItem("prev-chats")) || []);
  }, [setCurrentChat, setPreviousChat]);

  const handleSendMessage = (msg) => {
    if (!msg || !msg.trim()) return;

    setNewChat(false);

    const userMsg = {
      sender: "user",
      text: msg.trim(),
      time: new Date().toLocaleTimeString(),
    };

    const check = botData.find(
      (ele) => ele.question && ele.question.trim().toLowerCase() === msg.trim().toLowerCase()
    );

    const botMsg = {
      sender: "bot",
      text: check ? check.response : "As an AI language model, I don't have the details",
      time: new Date().toLocaleTimeString(),
    };

    const updatedCurrentChat = [...currentChat, userMsg, botMsg];
    setCurrentChat(updatedCurrentChat);
    setCurrentMessage("");

    const updatedPrevious = [...previousChat];
    if (updatedPrevious.length > 0) {
      updatedPrevious[updatedPrevious.length - 1] = [
        ...updatedPrevious[updatedPrevious.length - 1],
        userMsg,
        botMsg,
      ];
    } else {
      updatedPrevious.push([userMsg, botMsg]);
    }

    setPreviousChat(updatedPrevious);

    localStorage.setItem("chat", JSON.stringify(updatedCurrentChat));
    localStorage.setItem("prev-chats", JSON.stringify(updatedPrevious));

    console.log(previousChat);
    console.log(currentChat);
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
              "Hi, what is tempreature",
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
        pastConversations ? (<div className="past-chats">
          <h3>Today's Chats</h3>

          {previousChat.map((ele, i) => (
            <div className='prev-chat-wrapper' key={i}>
              {ele.map((c, j) => (
                <div className='chat' key={j}>
                  <img src={c.sender === "user" ? user : pfp} alt={c.sender} />
                  <div className="msg">
                    <span>{c.text}</span>
                    <span className="time">
                      {c.sender === "user" ? "You" : "Soul AI"} • {c.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}


        </div>) : (<div className="current-chats">
          {currentChat.map((ele, idx) => (
            <div className="chat" key={idx}>
              <img src={ele.sender === "user" ? user : pfp} alt={ele.sender} />
              <div className="msg">
                    <span>{c.text}</span>
                    <span className="time">
                      {c.sender === "user" ? "You" : "Soul AI"} • {c.time}
                    </span>
                  </div>
            </div>
          ))}
        </div>)
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
        <button id="save" onClick={() => handleSendMessage(message)}>
          Save
        </button>
      </div>
    </div>
  );
}
