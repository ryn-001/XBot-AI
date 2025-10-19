import { useState, useEffect } from "react";
import "./Chat.css"
import pfp from "../assets/images/chat-pfp.png"
import botData from "../sampleData.js";
import user from "../assets/images/user.png";

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

        setShowWelcome(false);

        const userMsg = {
            sender: "user",
            text: message,
            time: new Date().toLocaleTimeString(),
        }

        const updatedChat = [...currentChat, userMsg];
        setCurrentChat(updatedChat);
        setCurrentMessage("");

        const match = botData.find((item) => item.question.toLowerCase() === message.toLowerCase());
        const botReply = match ? match.response : "As an AI Language Model, I don't have the details.";

        const botMsg = {
            sender: "bot",
            text: botReply,
            time: new Date().toLocaleTimeString(),
            feedback: null,
        }

        setTimeout(() => {
            setCurrentChat((prev) => [...prev, botMsg]);
        }, 500);
    };


    return (
        <div className="chat-section">
            <div className="bot-ai-heading">
                <h3>Bot AI</h3>
            </div>

            {showWelcome ? (<div className="welcome-heading">
                                <div className="welcome">
                                    <h1>How can I Help You Today ?</h1>
                                    <img src={pfp} alt="pfp"/>
                                </div>

                                <div className="welcome-questions">
                                    <button className="question" onClick={() => handleSendMessage("Hi, what is the weather")}>
                                        <h3>Hi, what is the weather</h3>
                                        <p>Get immediate AI generated response</p>
                                    </button>

                                    <button className="question" onClick={() => handleSendMessage("Hi, what is my location")}>
                                        <h3>Hi, what is my location</h3>
                                        <p>Get immediate AI generated response</p>
                                    </button>

                                    <button className="question question-3" onClick={() => handleSendMessage("Hi, what is tempreature")}>
                                        <h3>Hi, what is tempreature</h3>
                                        <p>Get immediate AI generated response</p>
                                    </button>

                                    <button className="question" onClick={() => handleSendMessage("Hi, how are you")}>
                                        <h3>Hi, how are you</h3>
                                        <p>Get immediate AI generated response</p>
                                    </button>
                                </div>
            </div>) : (<div className="current-chats">
                        
            </div>)}         

            <div className="input-section">
                <input type="text"/>    
                <button id="send">Send</button>
                <button id="save">Save</button>
            </div>   
        </div>
    )
}