import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Input,
  Row,
  FormGroup,
  Label,
  Form,
  CustomInput,
  Button,
  Alert,
  FormText,
} from "reactstrap";

const GetForm = () => {
  const [formFields, setFormFields] = useState({}); //store data from get_form.php
  const [formValues, setFormValues] = useState({}); //store input form values
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/api/get_form.php")
      .then((res) => res.json())
      .then((data) => setFormFields(data.data.fields[0])); //get data form get-form.php
  }, []);
  //console.log(formFields);
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
      <div class="col mb-5">                                   
        <h1 class="mt-5 text-center mb-5 ">Get Form</h1>             
        <Form onSubmit={handleSubmit}>
          {
            Object.entries(formFields).map((value, key) => {
             // console.log({ formFields });
              return (                                                       //show the get_form data title                           
                <FormGroup row key={key}>
                  <Label for="title" sm={2} className="font-weight-bold">   
                    {value[1].title}   
                                                     
                  </Label>
                </FormGroup>
              );
            })}                                                    
            <Button color="success" type="submit">                     
            Submit Form
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default GetForm;
