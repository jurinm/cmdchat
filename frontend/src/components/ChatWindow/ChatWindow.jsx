import { useState, useRef, useEffect } from "react";
import styles from "./chatwindow.module.css";
import moment from "moment";

const ChatWindow = ({ sendMessage, messages, username }) => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef();
  const date = moment(messages.messageTime).format("DD MMM YYYY hh:mm a")
  const inputHandler = (e) => {
    setMessage((newMessage) => (newMessage = e));
  };

  const enterHandler = (event) => {
    if(event.key === 'Enter'){
      sendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);
  return (
    <div>
      <div className={styles.chat}>
        {messages.map((message) => {
          return (
            <div
              className={
                username == message.nickname ? `${styles.messageYour}` : ""
              }
              key={message._id}
            >
              <span>{moment(message.messageTime).format("DD MMM YYYY HH:mm ")}</span>
              <span>{`//${message.nickname}/:>sayd>`}</span>
              <span>{message.message}</span>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      <div className="">
        <input
          type="text"
          value={message}
          onChange={(e) => inputHandler(e.target.value)}
          onKeyUp={enterHandler}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
