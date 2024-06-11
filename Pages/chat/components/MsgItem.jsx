import style from "../chat.module.css";
import UseChangedElement from "../../../chatStore";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Msg = ({ msg, index, deleteMsg,editMsg }) => {
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
        <div className={style.icons}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={style.deleteMsgIcon}
            onClick={() => {
              deleteMsg(index);
            }}
          />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className={style.editMsgIcon}
            onClick={() => {
              editMsg(index);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Msg;
