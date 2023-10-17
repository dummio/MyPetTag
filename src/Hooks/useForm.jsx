/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import { useState } from 'react';
import { omit } from 'lodash';

/**
 * Returns hooks to use for form validation
 * @param {Function} callback
 * @returns { values, errors, handleChange, handleSubmit }
 */
function useForm(callback) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function validate(name, value, required) {
    console.log(required);

    // A function to validate each input values
    if (name === 'email') {
      if (
        !new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(value)
      ) {
        if (required || value.length > 0) {
          setErrors({
            ...errors,
            [name]: 'Enter a valid email address.',
          });
        }
      } else {
        let newObj = omit(errors, name);
        setErrors(newObj);
      }
    } else if (name === 'phone' || name === 'contactPhone') {
      if (
        !new RegExp(
          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        ).test(value)
      ) {
        if (required || value.length > 0) {
          setErrors({
            ...errors,
            [name]: 'Enter a valid phone number.',
          });
        }
      } else {
        let newObj = omit(errors, name);
        setErrors(newObj);
      }
    } else if (name === 'password') {
      if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/).test(value)) {
        if (required || value.length > 0) {
          setErrors({
            ...errors,
            [name]: 'Password does not meet requirements.',
          });
        }
      } else {
        let newObj = omit(errors, name);
        setErrors(newObj);
      }
    } else if (name === 'petWeight') {
      if (required && (value === null || value === undefined || value === '')) {
        setErrors({
          ...errors,
          [name]: 'Field cannot be empty.',
        });
      } else if (value < 1 || value > 400) {
        setErrors({
          ...errors,
          [name]: 'Enter a valid weight.',
        });
      } else {
        let newObj = omit(errors, name);
        setErrors(newObj);
      }
    } else {
      if (required && (value === null || value === undefined || value === '')) {
        setErrors({
          ...errors,
          [name]: 'Field cannot be empty.',
        });
      } else {
        let newObj = omit(errors, name);
        setErrors(newObj);
      }
    }
  }

  function handleChange(event) {
    event.persist();

    let name = event.target.name;
    let value = event.target.value;

    setValue(name, value, event.target.required);
  }

  function setValue(name, value, required) {
    validate(name, value, required);

    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();

    for (let key in values) {
      validate(key, values[key]);
    }

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValue,
  };
}

export default useForm;
