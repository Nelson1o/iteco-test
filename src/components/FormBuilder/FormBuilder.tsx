import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import Form from "../Form/Form";
import Loader from "../Loader";

import styles from "./FormBuilder.module.scss";

interface IFormState {
  id: number;
  type: string;
  value: number | string;
}

const FormBuilder: React.FC = () => {
  const [forms, setForms] = useState<IFormState[]>([]);

  const addForm = () => {
    setForms((prev) => [...prev, { id: Math.random(), type: "text", value: "" }]);
  };

  const removeForm = (id: number) => {
    setForms((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.name === "checkbox" ? String(e.target.checked) : e.target.value;

    setForms((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.value = value;
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
    alert(JSON.stringify(forms));
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(forms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setForms(items);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.buttonItems}>
        <button className={styles.addButton} type="button" onClick={addForm}>
          Add
        </button>
        <button className={styles.addButton} type="submit">
          Submit
        </button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) =>
            forms.length !== 0 ? (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {forms.map((form, index) => (
                  <Form
                    key={form.id}
                    index={index}
                    removeForm={removeForm}
                    changeTypeForm={changeTypeForm}
                    onChangeValue={onChangeValue}
                    {...form}
                  />
                ))}
                {provided.placeholder}
              </div>
            ) : (
              <Loader />
            )
          }
        </Droppable>
      </DragDropContext>
    </form>
  );
};

export default FormBuilder;
