import { useState, useEffect } from "react";
import "./Sidebar.css";
import profileImage from "../assets/images/profile-image.png";
import addNewChat from "../assets/images/add-new-chat-img.png";

export default function Sidebar({ pastConversations, setPastconversations }) {

    return (
        <div className="sidebar">
            <div className="add-new-chat">
                <div className="header">
                    <div className="profile">
                        <img src={profileImage} alt="profile-image" />
                    </div>

                    <span>New Chat</span>

                    <div className="add-chat-icon">
                        <img src={addNewChat} alt="add-new-chat-img" />
                    </div>
                </div>

                <div className="button-wrapper">
                    <button className="past-conversation-button">Past Converstions</button>
                </div>
            </div>
        </div>
    )
}