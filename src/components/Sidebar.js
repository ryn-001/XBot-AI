import "./Sidebar.css";
import profileImage from "../assets/images/profile-image.png";
import addNewChat from "../assets/images/add-new-chat-img.png";
import { Link } from "react-router-dom";

export default function Sidebar({ onNewChat }) {
    const handleNewChat = () => {
        onNewChat();
    }

    return (
        <div className="sidebar">
            <div className="add-new-chat">
                <div className="header">
                    <div className="profile">
                        <img src={profileImage} alt="profile-image" style={{cursor:"pointer"}}/>
                    </div>

                    <span style={{fontWeight: "bold"}}>New Chat</span>

                    <div className="add-chat-icon">
                        <Link to="/" onClick={handleNewChat}>
                            <img src={addNewChat} alt="add-new-chat-img" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                </div>

                <div className="button-wrapper">
                    {/* Changed to /history to match test */}
                    <Link to="/history" style={{ textDecoration: 'none', width: '90%', display: 'block' }}>
                        <button type="button" className="past-conversation-button"> {/* Added type="button" */}
                            Past Conversations
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}