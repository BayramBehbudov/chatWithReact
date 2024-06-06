import React, { useEffect, useState } from "react";

const TextInput = ({ setValue, placeholder, val }) => {
  const [value, setInputValue] = useState(false);

  useEffect(() => {
    if (value) {
      setValue(value);
    } else {
      setValue(false);
    }
  }, [value, setValue]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={val}
      onBlur={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
};

export default TextInput;
