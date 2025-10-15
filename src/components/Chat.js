import { useState, useEffect } from "react";
import "./Chat.css"
import pfp from "../assets/images/chat-pfp.png"

export default function Chat() {

    return (
        <div className="chat-section">
            <div className="bot-ai-heading">
                <h3>Bot AI</h3>
            </div>

            <div className="chat-heading">
                <h1>How can I help you today ?</h1>

                <div className="chat-pfp">
                    <img src={pfp} alt="chat-pfp" />
                </div>
            </div>

            <div className="questions-section">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </div>

            <div className="input-section">
                <input type="text" className="text-input" />

                <button className="send-button">Send</button>

                <button className="save-button">Save</button>

            </div>
        </div>
    )
}