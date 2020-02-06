import React, { useState, createContext } from "react";

const FormsValuesContext = createContext([{}, () => {}]);

const FormsValuesProvider = props => {
  const [values, setValues] = useState({});

  return (
    <FormsValuesContext.Provider value={[values, setValues]}>
      {props.children}
    </FormsValuesContext.Provider>
  );
};

export { FormsValuesContext, FormsValuesProvider };
