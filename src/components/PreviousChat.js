import { Link } from "react-router-dom";
import "./PreviousChat.css";
import pfp from "../assets/images/chat-pfp.png";
import user from "../assets/images/user.png";

export default function PreviousChat({ 
  previousChats, 
  setCurrentChat, 
  onNewChat 
}) {
  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    localStorage.setItem("currentChat", JSON.stringify(chat));
  };

  console.log("PreviousChats component - chats:", previousChats);

  return (
    <div className="previous-chats-page">
      <header className="previous-chats-header">
        <h1>Past Conversations</h1>
        <Link to="/" onClick={onNewChat} className="new-chat-btn">
          Start New Chat
        </Link>
      </header>

      <div className="previous-chats-list">
        {previousChats && previousChats.length > 0 && previousChats.some(chat => chat.length > 0) ? (
          previousChats.map((chat, index) => (
            chat.length > 0 && (
              <Link 
                to="/" 
                key={index} 
                className="chat-session"
                onClick={() => handleChatClick(chat)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="chat-session-content">
                  <div className="chat-session-header">
                    <h3>Chat Session {index + 1}</h3>
                    <span className="message-count">
                      {chat.length} messages
                    </span>
                  </div>
                  
                  <div className="chat-preview">
                    {chat.slice(0, 2).map((message, msgIndex) => (
                      <div key={msgIndex} className="preview-message">
                        <img 
                          src={message.sender === "user" ? user : pfp} 
                          alt={message.sender} 
                        />
                        <p>{message.text}</p>
                      </div>
                    ))}
                    {chat.length > 2 && (
                      <div className="more-messages">
                        +{chat.length - 2} more messages
                      </div>
                    )}
                  </div>
                  
                  <div className="chat-time">
                    Last message: {chat[chat.length - 1]?.time}
                  </div>
                </div>
              </Link>
            )
          ))
        ) : (
          <div className="no-chats">
            <h2>No previous conversations</h2>
            <p>Start a new chat to see your conversations here</p>
            <Link to="/" onClick={onNewChat} className="new-chat-btn">
              Start Your First Chat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}