import React, { useState } from "react";
import { Form, FormLabel, InputGroup } from "react-bootstrap";

const PasswordInput = (props) => {
  const [type, setType] = useState("password");

  return (
    <>
      <FormLabel>Password</FormLabel>
      <InputGroup className="mb-3">
        <Form.Control type={type} {...props} />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
    </>
  );
};

export default PasswordInput;
