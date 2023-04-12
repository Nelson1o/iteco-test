import React from "react";

import styles from "./Form.module.scss";

type TForm = {
  id: number;
  type: string;
  text: string | number;
  removeForm: (id: number) => void;
  changeTypeForm: (e: React.ChangeEvent<HTMLSelectElement>, id: number) => void;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const Form: React.FC<TForm> = ({ id, type, text, removeForm, changeTypeForm, onChangeValue }) => {
  return (
    <div className={styles.formItems}>
      <div className={styles.formItem}>
        <label htmlFor={id.toString()}>Full Name</label>
        <input
          type={type}
          className={styles.input}
          placeholder={type}
          id={id.toString()}
          value={text}
          onChange={(e) => onChangeValue(e, id)}
        />
      </div>

      <div className={styles.changeForm}>
        <select
          defaultValue={type}
          onChange={(e) => changeTypeForm(e, id)}
          className={styles.select}
          name="formType"
        >
          <option value="text">text</option>
          <option value="checkbox">checkbox</option>
          <option value="email">email</option>
          <option value="password">password</option>
        </select>

        <button className={styles.closeButton} onClick={() => removeForm(id)}>
          <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Form;
