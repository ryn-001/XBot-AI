import { useState, useEffect } from "react";
import "./Chat.css"
import pfp from "../assets/images/chat-pfp.png"
import botData from "../sampleData.js";

export default function Chat() {
    const [message, setCurrentMessage] = useState("");
    const [currentChat, setCurrentChat] = useState([]);
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("chat")) || [];
        setCurrentChat(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("chat", JSON.stringify(currentChat));
    }, [currentChat])

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    }

    const handleSendMessage = (message) => {
        if (message.trim() === "") return;

        const userMsg = {
            sender: "user",
            text: message,
            time: new Date().toLocaleTimeString(),
        }

        const updatedChat = [...currentChat, userMsg];
        setCurrentChat(updatedChat);
        setCurrentMessage("");

        const match = botData.find((item) => item.question.question.toLowerCase() === message.toLowerCase());
        const botReply = match ? match.response : "As an AI Language Model, I don't have the details.";

        const botMsg = {
            sender: "bot",
            text: botReply,
            time: new DataTransfer().toLocaleTimeString(),
            feedback: null,
        }

        setTimeout(() => {
            setCurrentChat((prev) => [...prev, botMsg]);
        }, 500);
    };

    const handleFeedback = (idx, val) => {
        const updated = currentChat.map((msg, i) => i === idx ? {
            ...msg,
            feedback: val,
        } : msg);

        setCurrentChat(updated);
    }


    return (
        <div className="chat-section">
            <div className="bot-ai-heading">
                <h3>Bot AI</h3>
            </div>

            {showWelcome ? (<>
                <div className="chat-heading">
                    <h1>How can I help you today ?</h1>

                    <div className="chat-pfp">
                        <img src={pfp} alt="chat-pfp" />
                    </div>
                </div>

                <div className="questions-section">
                    <button className="question">
                        <h3>Hi, what is the weather</h3>
                        <p>Get immediate AI generated response</p>
                    </button>

                    <button className="question">
                        <h3>Hi, what is my location</h3>
                        <p>Get immediate AI generated response</p>
                    </button>

                    <button className="question">
                        <h3>Hi, what is the temreature</h3>
                        <p>Get immediate AI generated response</p>
                    </button>

                    <button className="question">
                        <h3>Hi, how are you</h3>
                        <p>Get immediate AI generated response</p>
                    </button>
                </div>

            </>) : (<div className="chat-messages">
                {currentChat.length > 0 ? (
                    currentChat.map((chat, idx) => (
                        <div key={idx} className="chat-box">
                            <div className="chat-msg">{chat.text}</div>
                            <div className="chat-time">{chat.timestamp}</div>

                            {chat.sender === "bot" && (
                                <>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`feedback-${idx}`}
                                            value="like"
                                            checked={chat.feedback === "like"}
                                            onChange={() => handleFeedback(idx, "like")}
                                        />{" "}
                                        👍
                                    </label>
                                    {"  "}
                                    <label>
                                        <input
                                            type="radio"
                                            name={`feedback-${idx}`}
                                            value="dislike"
                                            checked={chat.feedback === "dislike"}
                                            onChange={() => handleFeedback(idx, "dislike")}
                                        />{" "}
                                        👎
                                    </label>
                                </>
                            )}
                        </div>
                    ))
                ) : (<></>)}
            </div>)}

            <div className="input-section">
                <input
                    type="text"
                    className="text-input"
                    value={message}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />

                <button className="send-button" onClick={handleSendMessage}>Send</button>

                <button className="save-button">Save</button>

            </div>
        </div>
    )
}