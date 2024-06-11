import { useEffect, useRef, useState } from "react";
import chatStore from "../../chatStore.js";
import { useNavigate } from "react-router-dom";
import style from "./chat.module.css";
import Msg from "./components/MsgItem.jsx";
import TextInput from "../../components/TextInput.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { Set, AllMsg, ListenerMsgs, DeleteMsg } from "../../src/Base.jsx";
import Emojies from "./components/Emojies.jsx";

const Chat = () => {
  const [inputValue, setInputValue] = useState(false);
  const [deletedIndex, setDeletedIndex] = useState(false);
  const [viewEmoji, setViewEmoji] = useState(false);
  const [msgEditor, setMsgEditor] = useState(false);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(false);

  const messagesEndRef = useRef(null);

  const { entry, myData, setEntry, setMyData } = chatStore();
  const [messages, setMessages] = useState(false);
  const navigate = useNavigate();
  if (deletedIndex) {
    AllMsg.splice(+deletedIndex, 1);
    DeleteMsg(deletedIndex);
    setDeletedIndex(false);
  }

  useEffect(() => {
    if (!entry) {
      navigate("/");
      return;
    }
  }, [entry, navigate]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    ListenerMsgs((data) => {
      setMessages(data);
    });
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  let currentMsg = {
    mail: myData[1].Mail,
    name: myData[1].Name,
    date: formatDate(new Date()),
    text: inputValue,
    url: myData[1].Pic,
  };

  function msgSend() {
    if (!msgEditor && inputValue) {
      if (inputValue.replace(/\s+/gi, "")) {
        AllMsg.push(currentMsg);
        Set("messages", AllMsg);
        setInputValue(false);
        scrollToBottom();
      }
    } else {
      Set(`messages/${currentMsgIndex}/text`, inputValue);
      AllMsg[currentMsgIndex].text = inputValue;
      setInputValue(false);
      setMsgEditor(false);
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function logOut() {
    setMyData([]);
    setEntry();
    navigate("/");
  }

  const enterKey = (event) => {
    if (event.key === "Enter") {
      msgSend();
    }
  };

  return (
    <div className={style.chatContainer} onKeyDown={enterKey} tabIndex="0">
      <div className={style.chatBoard}>
        <div className={style.msgsBoard}>
          {AllMsg.map((data, index) => (
            <Msg
              msg={data}
              key={`message${index}`}
              index={index}
              deleteMsg={setDeletedIndex}
              editMsg={() => {
                setMsgEditor(true);
                setInputValue(AllMsg[index].text);
                setCurrentMsgIndex(index);
              }}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={style.senderBoard}>
          <button className={style.btnLogOut} onClick={logOut}>
            Log Out
          </button>
          <div className={style.messageInput}>
            <TextInput
              setValue={setInputValue}
              placeholder="Message"
              val={inputValue}
            />

            <div
              className={style.emojiesIcon}
              onClick={() => {
                setViewEmoji(!viewEmoji);
              }}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </div>

            <div
              className={`${style.emojiesBoard} ${
                viewEmoji && style.viewEmoji
              }`}
            >
              <Emojies setInputValue={setInputValue} emojiView={setViewEmoji} />
            </div>
          </div>

          <FontAwesomeIcon
            icon={faPlay}
            className={style.iconSender}
            onClick={msgSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
