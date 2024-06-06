import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import style from "../style.module.css";

const FileInput = ({setValue}) => {
  const [File, setFile] = useState(false);

  useEffect(() => {
    setValue(File);
  }, [File, setValue]);

  return (
    <div className={style.profilePicCont}>
      <label htmlFor="set-profilePic" className={style.profilPiclabel}>
        <FontAwesomeIcon icon={faCloudArrowUp} className={style.icon} />
        <p>Choose Picture</p>
      </label>
      <input
        type="file"
        id="set-profilePic"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default FileInput;
