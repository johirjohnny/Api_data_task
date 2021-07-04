//https://www.youtube.com/watch?v=9OGAJ5Y5GCg update using paramsimport React, { useEffect, useState } from "react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Alert,
  FormText,
} from "reactstrap";

function UpdateForm() {
  let { userId } = useParams(); //get the dynamic userid for different user


  const [formFields, setFormFields] = useState({}); //store data from get_form.php
  const [formValues, setFormValues] = useState({}); //store input form values
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

//get data form get-form.php and render it depending on the userId 
  useEffect(() => {
    const url = `http://localhost/api/get_form.php?id=${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFormFields(data.data.fields[0])); 
  }, [userId]);
  //console.log(userId);
  const validForm = (type, value, name) => {
    if (type === "only_letters") {
      return value.match(/^[a-zA-Z ]*$/)
        ? setErrorMessage({ invalid: false, message: "" })
        : setErrorMessage({
            invalid: true,
            message: "only  character type are support",
            name,
          });
    } else if (type === "email|max:200") {
      return value.length > 20
        ? setErrorMessage({
            invalid: true,
            message: "email must be in 20 character",
            name,
          })
        : setErrorMessage({ invalid: false, message: "" });
    } else {
      return { invalid: false, message: "" };
    }
  };

  const handleChange = (target) => {
    let name = target.name;
    let value = target.value;
    //console.log(value);
    const inputValues = { ...formValues };
    inputValues[name] = value;
    setFormValues(inputValues);
  };

  const formInput = (formObj) => {
    const {
      type,
      options,
      required,
      validate,
      value,
      html_attr: { id, class: className },
    } = formObj[1];
    let fieldName = formObj[0];

    switch (type) {
      case "radio":
        return (
          <FormGroup id={id}>
            {options.map((option) => {
              return (
                <CustomInput
                  key={option.key}
                  type={type}
                  id={option.key}
                  label={option.label}
                  defaultChecked={formObj[1].default === option.key}
                  className={className}
                  name={fieldName}
                  value={option.key}
                  onChange={({ target }) => {
                    handleChange(target);
                  }}
                  inline
                />
              );
            })}
          </FormGroup>
        );
      case "select":
        return (
          <CustomInput
            type={type}
            id={id}
            required={required}
            name={fieldName}
            className={className}
            value={formValues[fieldName]}
            onChange={({ target }) => {
              handleChange(target);
            }}
          >
            {options.map((option) => (
              <option
                key={option.key}
                value={option.key}
                defaultValue={option.key === formObj[1].default}
              >
                {option.label}
              </option>
            ))}
          </CustomInput>
        );
      default:
        return (
          <FormGroup>
            <Input
              className={className}
              id={id}
              required={required}
              type={type}
              name={fieldName}
              defaultValue={value}
              onChange={({ target }) => {
                handleChange(target);
                validForm(validate, target.value, fieldName);
              }}
              invalid={errorMessage.name === fieldName && errorMessage.invalid}
            />
            {errorMessage.name === fieldName && (
              <FormText>{errorMessage.message}</FormText>
            )}
          </FormGroup>
        );
    }
  };

  const handleSubmit = (e) => {
    //handle form data by posting to submit form
    e.preventDefault();
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //   // Adding method type
    //   method: "POST",

    //   // Adding body or contents to send
    //   body: JSON.stringify({
    //     formValues,

    //     // Adding headers to the request
    //   })

    //     // Converting to JSON
    //     .then((response) => response.data())

    //     // Displaying results to console
    //     .then((data) => setResponseMessage(data.status)),
    // });
    // setFormValues({});
    axios
      .post("http://localhost/api/submit_form.php", formValues)
      .then((res) => {
        setResponseMessage(res.data.status);
      });
    setFormValues({});
  };
  return (
    <div class="row">
      <div class=" col ms-5">
        <h1 class="mt-5 text-center mb-5">Update Form</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formFields).length &&
            Object.entries(formFields).map((value, key) => {
              return (
                <div class="form-group mx-4" row key={key}>
                  <Label for="title of all type" className="font-weight-bold">
                    {value[1].title}
                  </Label>
                  <div class="col ">{formInput(value)}</div>
                </div>
              );
            })}
          <Button color="primary" type="submit">
            Update
          </Button>
        </form>

        {responseMessage && ( //show the response message from the post request using an alert type
          <Alert
            color={responseMessage === "success" ? "success" : "danger"}
            class="mt-4"
          >
            {responseMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
export default UpdateForm;
