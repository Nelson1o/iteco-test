import React from "react";
import FormBuilder from "./components/FormBuilder/FormBuilder";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <FormBuilder />
      </div>
    </div>
  );
};

export default App;
