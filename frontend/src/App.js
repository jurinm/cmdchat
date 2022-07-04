import "./App.css";
import { io } from "socket.io-client";
import { ChatWindow, Wellcome } from "./components";
import { useState, useEffect, useCallback, useContext } from "react";
import { socket } from "./socket";
import AuthStore from "./store/authStore";
import { AuthContext } from "./store/nicknameStore";

function App() {
  const [messages, setMessages] = useState([]);
  const [socketInst, setSocket] = useState();
  const [usersOnline, setUsersOnline] = useState([])
  const { userData, setUserData } = useContext(AuthContext);

  const sendMessage = (message) => {
    socket.emit("sendMessage", { nickname: userData.name, message: message, userColor: userData.color });
  };

  const connected = () => {
    socket.emit("connected", {name: userData.name, color: userData.color, id: socket.id});
  };

  useEffect(() => {
    if(userData.name) connected()
  
    return () => {
      console.log('connected')
    }
  }, [userData])
  
  socket.on("init", (data) =>
    setMessages((newMessages) => (newMessages = data))
  );

  socket.on('user left', (data) => {setUsersOnline(newUsers => newUsers = data)
    console.log(`user left ${data}`)})

  socket.on(
    "messageAdded",
    (data) => {setMessages((newMessage) => (newMessage = messages.concat(data)))
    console.log(`From effect ${messages}`)}
  );

  socket.on('user joined', (data) => {setUsersOnline(newUsers => newUsers = data)
    console.log(`user joined ${data}`)})

  return (
    <div className="App">
      {userData.name ? (
        <ChatWindow
          sendMessage={sendMessage}
          messages={messages}
          username={userData.name}
          users = {usersOnline}
          color = {usersOnline.color}
          yourColor = {userData.color}
        />
      ) : (
        <Wellcome />
      )}
    </div>
  );
}

export default App;
