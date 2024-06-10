const TextInput = ({ setValue, placeholder, val }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={val ? val : ""}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default TextInput;
