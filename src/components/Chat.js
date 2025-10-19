import { useState } from "react";
import "./Chat.css";
import pfp from "../assets/images/chat-pfp.png";
import botData from "../sampleData.js";
import user from "../assets/images/user.png";

export default function Chat({ previousChat, setPreviousChat }) {
    const [message, setCurrentMessage] = useState("");
    const [showWelcome, setShowWelcome] = useState(previousChat.length === 0);

    const handleSendMessage = (msgText) => {
        const msg = msgText ? msgText.trim() : message.trim();
        if (!msg) return;

        setShowWelcome(false);

        const userMsg = {
            sender: "user",
            text: msg,
            time: new Date().toLocaleTimeString(),
        };

        const match = botData.find(
            (item) => item.question.toLowerCase() === msg.toLowerCase()
        );
        const botReply = match
            ? match.response
            : "As an AI Language Model, I don't have the details.";

        const botMsg = {
            sender: "bot",
            text: botReply,
            time: new Date().toLocaleTimeString(),
            feedback: null,
        };

        setPreviousChat([...previousChat, userMsg]);
        setCurrentMessage("");

        setTimeout(() => {
            setPreviousChat((prev) => [...prev, botMsg]);
        }, 500);
    };

    return (
        <div className="chat-section">
            <div className="bot-ai-heading">
                <h3>Bot AI</h3>
            </div>

            {showWelcome ? (
                <div className="welcome-heading">
                    <div className="welcome">
                        <h1>How can I Help You Today?</h1>
                        <img src={pfp} alt="pfp" />
                    </div>

                    <div className="welcome-questions">
                        <button
                            className="question"
                            onClick={() => handleSendMessage("Hi, what is the weather")}
                        >
                            <h3>Hi, what is the weather</h3>
                            <p>Get immediate AI generated response</p>
                        </button>

                        <button
                            className="question"
                            onClick={() => handleSendMessage("Hi, what is my location")}
                        >
                            <h3>Hi, what is my location</h3>
                            <p>Get immediate AI generated response</p>
                        </button>

                        <button
                            className="question question-3"
                            onClick={() => handleSendMessage("Hi, what is tempreature")}
                        >
                            <h3>Hi, what is tempreature</h3>
                            <p>Get immediate AI generated response</p>
                        </button>

                        <button
                            className="question"
                            onClick={() => handleSendMessage("Hi, how are you")}
                        >
                            <h3>Hi, how are you</h3>
                            <p>Get immediate AI generated response</p>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="current-chats">
                    {previousChat.map((ele, idx) => (
                        <div className="chat" key={idx}>
                            <img src={ele.sender === "user" ? user : pfp} alt={ele.sender} />
                            <div className="msg">
                                <h4>{ele.sender === "user" ? "You" : "Soul AI"}</h4>
                                <span>{ele.text}</span>
                                <span className="time">{ele.time}</span>
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
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                />

                <button id="send" onClick={() => handleSendMessage()}>
                    Send
                </button>
                
                <button id="save" onClick={() => handleSendMessage()}>
                    Save
                </button>
            </div>
        </div>
    );
}
