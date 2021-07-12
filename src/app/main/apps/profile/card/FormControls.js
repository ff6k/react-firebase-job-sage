import { useState } from "react";

const PostForm = async (
  values,
  successCallback,
  errorCallback
) => {
  if (true) successCallback();
  else errorCallback();
};

const initialFormValues = {
  name: "",
  number: "",
  expiry: "",
  cvc: "",
  formSubmitted: false,
  success: false
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("number" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."; 

    if ("expiry" in fieldValues)
      temp.expiry = fieldValues.name ? "" : "This field is required."; 

    if ("cvc" in fieldValues)
      temp.cvc = fieldValues.name ? "" : "This field is required."; 

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.name &&
      fieldValues.number &&
      fieldValues.expiry &&
      fieldValues.cvc &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      await PostForm(values, handleSuccess, handleError);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid
  };
};
