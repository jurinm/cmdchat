import "./App.css";
import { io } from "socket.io-client";
import { ChatWindow,Wellcome } from "./components";
import { useState, useEffect, useCallback, useContext } from "react";
import { socket } from "./socket";
import AuthStore from "./store/authStore";
import { AuthContext } from "./store/nicknameStore";


function App() {
  const [messages, setMessages] = useState([]);
  const [socketInst, setSocket] = useState();
  const {userData, setUserData} = useContext(AuthContext);

  const sendMessage = (message) => {
    socket.emit("sendMessage", {'nickname': userData.name,
      'message': message});
  };

  useEffect(() => {
    socket.on("init", (data) =>
      setMessages((newMessages) => (newMessages = data))
    );
  }, []);

  socket.on("messageAdded", (data) =>
      setMessages((newMessage) => newMessage = messages.concat(data)),
      console.log(`From effect ${messages}`)
    );

  return (
    <div className="App">
      
        {userData.name ? <ChatWindow sendMessage = {sendMessage} messages = {messages} username= {userData.name}/> : <Wellcome />}
      
    </div>
  );
}

export default App;
