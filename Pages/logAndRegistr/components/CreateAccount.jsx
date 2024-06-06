import style from "./style.module.css";
import { Push, Uploader } from "../../../src/Base.jsx";
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
  async function setData() {
    if (!nameValue) {
      showWarnMsg("Enter Name");
      return;
    }

    if (!mailValue) {
      showWarnMsg("Enter Correct Email");
      return;
    }

    if (!passValue) {
      showWarnMsg("Enter Correct Password");
      return;
    }

    if (!fileValue) {
      showWarnMsg("Enter Profile Picture");
      return;
    }

    if (nameValue && mailValue && passValue && fileValue) {
      const data = {
        Name: nameValue,
        Mail: mailValue,
        Pass: passValue,
        Pic: fileValue ? await Uploader(fileValue) : false,
      };
      Push("users", data);
      showSuccesMsg("Registration Complete");
      navPage("login");
    }
  }

  return (
    <div className={style.content}>
      <h1>Registration </h1>
      <div>
        <TextInput setValue={setNameValue} placeholder="Name" />
        <Email setValue={setMailValue} />
        <Input setValue={setPassValue} />
        <FileInput setValue={setFileValue} />
      </div>
      <button
        className={style.button}
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
