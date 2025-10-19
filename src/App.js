import Sidebar from "./components/Sidebar.js";
import Chat from "./components/Chat.js";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [previousChat, setPreviousChat] = useState(
    JSON.parse(localStorage.getItem("chat")) || []
  );

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(previousChat));
    console.log(previousChat);
  }, [previousChat]);

  return (
    <div className="App">
      <Sidebar previousChat={previousChat} setPreviousChat={setPreviousChat}/>
      <Chat previousChat={previousChat} setPreviousChat={setPreviousChat} />
    </div>
  );
}

export default App;
