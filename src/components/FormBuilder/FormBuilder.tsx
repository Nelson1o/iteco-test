import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import Loader from "../Loader";

import styles from "./FormBuilder.module.scss";

interface IFormState {
  id: number;
  type: string;
  text: number | string;
}

const FormBuilder: React.FC = () => {
  const [forms, setForms] = useState<IFormState[]>([]);

  const addForm = () => {
    setForms((prev) => [...prev, { id: Math.random(), type: "text", text: "" }]);
  };

  const removeForm = (id: number) => {
    setForms((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setForms((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.text = e.target.value;
        }
        return item;
      })
    );
  };

  const changeTypeForm = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    setForms((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.type = e.target.value;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const items = localStorage.getItem("formsItems");
    if (items) {
      const parse: IFormState[] = JSON.parse(items!);
      setForms((prev) => [...prev, ...parse]);
    }
  }, []);

  useEffect(() => {
    if (forms.length !== 0) {
      localStorage.setItem("formsItems", JSON.stringify(forms));
    }
  }, [forms]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(forms);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.buttonItems}>
        <button className={styles.addButton} /* type="button" */ onClick={addForm}>
          Add
        </button>
        <button className={styles.addButton} type="submit">
          Submit
        </button>
      </div>

      {forms.length !== 0 ? (
        forms.map((form) => (
          <Form
            key={form.id}
            removeForm={removeForm}
            changeTypeForm={changeTypeForm}
            onChangeValue={onChangeValue}
            {...form}
          />
        ))
      ) : (
        <Loader />
      )}
    </form>
  );
};

export default FormBuilder;
