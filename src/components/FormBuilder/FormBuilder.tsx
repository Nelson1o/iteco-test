import React, { useState } from "react";
import Form from "../Form/Form";

import styles from "./FormBuilder.module.scss";

const FormBuilder: React.FC = () => {
  const [forms, setForms] = useState([
    {
      id: Math.random(),
      type: "text",
      // className
    },
  ]);

  const addForm = () => {
    setForms((prev) => [...prev, { id: Math.random(), type: "text" }]);
  };

  const removeForm = (id: number) => {
    setForms((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className={styles.buttonItems}>
        <button className={styles.addButton} onClick={addForm}>
          Add
        </button>
        <button className={styles.addButton}>Submit</button>
      </div>

      {forms.map((form) => (
        <Form key={form.id} removeForm={removeForm} {...form} />
      ))}
    </div>
  );
};

export default FormBuilder;
