import { useState, useRef, useEffect } from "react";
import styles from "./chatwindow.module.css";
import moment from "moment";

const ChatWindow = ({ sendMessage, messages, username, users, color, yourColor }) => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef();
  const date = moment(messages.messageTime).format("DD MMM YYYY hh:mm a");
  const inputHandler = (e) => {
    setMessage((newMessage) => (newMessage = e));
  };

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      sendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(users);
  return (
    <div>
      <div className={styles.chat}>
        <div className={styles.chat__messages}>
          {messages.map((message) => {
            return (
              <div
                className={
                  username == message.nickname ? `${styles.messageYour}` : ""
                }
                key={message._id}
              >
                <span>
                  {moment(message.messageTime).format("DD MMM YYYY HH:mm ")}
                </span>
                <span style={{color: message.userColor}}>{`//${message.nickname}/:>sayd>`}</span>
                <span>{message.message}</span>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
          <div className={styles.input}>
            <p style={{color: yourColor}}>{username}@// </p>
            <input
              type="text"
              value={message}
              onChange={(e) => inputHandler(e.target.value)}
              onKeyUp={enterHandler}
              autoFocus={true}
            />
           
          </div>
        </div>
        <div className={styles.users}>
          <h4>Now online:</h4>
          {users.map((user) => {
            return <p style={{color: user.color}}>{user.username}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
