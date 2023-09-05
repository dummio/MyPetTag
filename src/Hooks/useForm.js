import React, { useState } from "react";
import { omit } from "lodash";

/**
 * Returns hooks to use for form validation
 * @param {Function} callback
 * @returns { values, errors, handleChange, handleSubmit }
 */
function useForm(callback) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function validate(event, name, value) {
    //A function to validate each input values
    switch (name) {
      case "username":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: "Username atleast have 5 letters",
          });
        } else {
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;
      case "phone":
        if (
          !new RegExp(
            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            phone: "Enter a valid phone number",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
      case "password":
        if (
          !new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains at least 8 characters and containing uppercase, lowercase, numbers, and a special character",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
      case "firstname":
        if (!new RegExp(/^.+$/).test(value)) {
          setErrors({
            ...errors,
            firstname: "Enter a first name",
          });
        } else {
          let newObj = omit(errors, "firstname");
          setErrors(newObj);
        }
        break;
      case "lastname":
        if (!new RegExp(/^.+$/).test(value)) {
          setErrors({
            ...errors,
            lastname: "Enter a last name",
          });
        } else {
          let newObj = omit(errors, "lastname");
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  }

  function handleChange(event) {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val,
    });
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert("There is an Error!");
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
