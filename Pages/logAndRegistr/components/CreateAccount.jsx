import style from "./style.module.css";
import { Push, Uploader, UserData } from "../../../src/Base.jsx";
import { useState } from "react";
import Email from "./components/MailInput.jsx";
import Input from "./components/PasswordInput.jsx";
import FileInput from "./components/File.jsx";
import TextInput from "../../../components/TextInput.jsx";
import { toast } from "react-toastify";

const CreateAccount = ({ navPage }) => {
  const [nameValue, setNameValue] = useState(false);
  const [mailValue, setMailValue] = useState(false);
  const [passValue, setPassValue] = useState(false);
  const [fileValue, setFileValue] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function showWarnMsg(text) {
    toast.error(text, {
      position: "top-right",
      autoClose: 2000,
    });
  }
  function showSuccesMsg(text) {
    toast.success(text, {
      position: "top-right",
      autoClose: 2000,
    });
  }
  function showInfoMsg(text) {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
    });
  }

  async function setData() {
    console.log("click");
    showInfoMsg("Please wait for the registration to complete");
    setDisabled(true);

    if (!nameValue) {
      showWarnMsg("Enter Name");
      setDisabled(false);
      return;
    }

    if (!mailValue) {
      showWarnMsg("Enter Correct Email");
      setDisabled(false);
      return;
    }

    if (!passValue) {
      showWarnMsg("Enter Correct Password");
      setDisabled(false);
      return;
    }

    if (!fileValue) {
      showWarnMsg("Enter Profile Picture");
      setDisabled(false);
      return;
    }
    if (!(await UserData(mailValue))) {
      const data = {
        Name: nameValue,
        Mail: mailValue,
        Pass: passValue,
        Pic: fileValue ? await Uploader(fileValue) : false,
      };
      Push("users", data);
      showSuccesMsg("Registration Complete");
      navPage("login");
    } else {
      showWarnMsg("This user already exists");
      navPage("login");
    }
  }

  return (
    <div className={style.content}>
      <h1>Registration </h1>
      <div>
        <TextInput setValue={setNameValue} placeholder="Name" val={nameValue} />
        <Email setValue={setMailValue} />
        <Input setValue={setPassValue} />
        <FileInput setValue={setFileValue} />
      </div>
      <button
        className={style.button}
        disabled={disabled}
        onClick={() => {
          setData();
        }}
      >
        Registration
      </button>

      <p>
        If you have an account
        <a
          onClick={() => {
            navPage("login");
          }}
        >
          click here
        </a>
      </p>
    </div>
  );
};

export default CreateAccount;
