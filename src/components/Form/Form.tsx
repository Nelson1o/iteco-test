import React from "react";

import styles from "./Form.module.scss";

type TForm = {
  id: number;
  type: string;
  removeForm: (id: number) => void;
};

const Form: React.FC<TForm> = ({ id, type, removeForm }) => {
  return (
    <div className={styles.formItem}>
      <input type={type} className={styles.input} />
      <input type={type} className={styles.input} />

      <button className={styles.closeButton} onClick={() => removeForm(id)}>
        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      </button>

      {/* <button className={styles.changeButton}>Change</button> */}
    </div>
  );
};

export default Form;
