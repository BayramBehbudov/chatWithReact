import React, { forwardRef, useEffect, useState } from "react";

const TextInput = forwardRef(({ setValue, placeholder, val }, ref) => {
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
      ref={ref}
      type="text"
      placeholder={placeholder}
      value={val}
      onBlur={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
});

export default TextInput;
