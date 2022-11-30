import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";

const BoulderUploadWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 36px;
  color: white;
`;

const LoginEmail = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
`;

export function Login() {
  return (
    <BoulderUploadWrapper>
      <Title>Login</Title>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          {/*<LoginEmail name="name" type="text" />*/}
          <Field name="name" type="text" as={LoginEmail} />
          <Field name="email" type="email" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </BoulderUploadWrapper>
  );
}

export default Login;
