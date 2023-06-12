import { useState } from "react";

const useCustomForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleChange };
};

export default useCustomForm;