import style from "../chat.module.css";
import UseChangedElement from "../../../ChangedElement";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Msg = ({ msg, index, deleteMsg }) => {
  const { myData } = UseChangedElement();
  return (
    <div
      className={`${style.msgContainer} 
      ${msg.mail === myData[1].Mail && style.author}`}
    >
      <div className={style.authContainer}>
        <p className={style.userName}>{msg.name}</p>
        <span>{msg.date}</span>
      </div>
      <div className={style.textContainer}>{msg.text}</div>
      <img src={msg.url} className={style.profilePic} />
      {msg.mail === myData[1].Mail && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={style.delete}
          onClick={() => {
            deleteMsg(index);
          }}
        />
      )}
    </div>
  );
};

export default Msg;
