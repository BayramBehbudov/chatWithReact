import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./passStyle.module.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PasswordInput = ({ setValue }) => {
  const [Pass, setPass] = useState(false);
  const [Toogle, setToogle] = useState(false);

  useEffect(() => {
    setValue(Pass);
  }, [Pass, setValue]);

  function showWarnMsg(text) {
    toast.warning(text, {
      position: "top-right",
      autoClose: 2000,
    });
  }

  const controlPass = () => {
    const uppercase = /[A-Z]/.test(Pass);
    const lowercase = /[a-z]/.test(Pass);
    if (uppercase && lowercase && Pass.length > 7) {
      toast.dismiss();
    } else {
      setPass(false);
      showWarnMsg(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 8 characters long."
      );
    }
  };

  return (
    <div className={style.input}>
      <input
        type={Toogle ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => {
          setPass(e.target.value);
        }}
        onBlur={controlPass}
      />

      <FontAwesomeIcon
        icon={Toogle ? faEye : faEyeSlash}
        className={style.eye}
        onClick={() => {
          setToogle(!Toogle);
        }}
      />
    </div>
  );
};

export default PasswordInput;
