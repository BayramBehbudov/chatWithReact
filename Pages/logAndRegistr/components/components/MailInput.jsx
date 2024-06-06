import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MailInput = ({ setValue }) => {
  const [mail, setMail] = useState(false);

  useEffect(() => {
    setValue(mail);
  }, [mail, setValue]);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showWarnMsg(text) {
    toast.warning(text, {
      position: "top-right",
      autoClose: 2000,
    });
  }

  function handleMail() {
    if (isValidEmail(mail)) {
      toast.dismiss();
    } else {
      setMail(false);
      showWarnMsg("Enter Correct Mail");
    }
  }
  return (
    <input
      type="email"
      placeholder="Email"
      onChange={(e) => {
        setMail(e.target.value);
      }}
      onBlur={handleMail}
    />
  );
};

export default MailInput;
