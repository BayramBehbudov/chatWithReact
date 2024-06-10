import style from "./style.module.css";
import { useState } from "react";
import { UserData } from "../../../src/Base.jsx";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import ChatStore from "../../../chatStore.js";

import Email from "./components/MailInput.jsx";
import Password from "./components/PasswordInput.jsx";

const Login = ({ navPage }) => {
  const { setEntry, setMyData } = ChatStore();

  const [password, setPassword] = useState(false);
  const [mail, setMail] = useState(false);

  const navigate = useNavigate();

  async function controlUser() {
    if (!password && !mail) {
      showInfoMsg("Enter Correct Information");
      return;
    }

    showInfoMsg("Information is verified");

    if ((password, mail)) {
      const myData = await UserData(mail);
      if (myData) {
        if (myData[1].Mail === mail && myData[1].Pass === password) {
          setEntry();
          setMyData(myData);
          navigate("/chat");
          showSuccessMsg("Login successful");
        } else {
          showErrorMsg("Invalid information");
        }
      } else {
        showErrorMsg("This User Not Found");
      }
    }
  }

  const toastAtrr = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
  };
  const showErrorMsg = (text) => {
    toast.error(text, toastAtrr);
  };
  const showSuccessMsg = (text) => {
    toast.success(text, toastAtrr);
  };

  const showInfoMsg = (text) => {
    toast.info(text, toastAtrr);
  };

  return (
    <div id="login" className={`${style.content}`}>
      <h1>Login</h1>
      <div>
        <Email setValue={setMail} />
        <Password setValue={setPassword} />
      </div>
      <button className={style.button} onClick={controlUser}>
        Login
      </button>
      <p>
        If you don't have an account
        <a
          className={style.toReg}
          onClick={() => {
            navPage("reg");
          }}
        >
          click here
        </a>
      </p>
    </div>
  );
};

export default Login;
