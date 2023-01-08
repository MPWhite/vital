import React from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";

const BoulderUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 28px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: #aaa;
  text-align: center;
  margin-bottom: 20px;
`;

const RegisterInput = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #222;
  color: white;
  border: none;
  padding: 0 20px;
  font-size: 14px;
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  box-sizing: border-box;
  background: linear-gradient(-45deg, #0072ff, #00c6ff);

  color: white;
`;

const RegisterForm = styled.div`
  padding: 20px;
`;

export function Register() {
  return (
    <BoulderUploadWrapper>
      <Title>Create new account</Title>
      <Subtitle>Please fill in the form to continue</Subtitle>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={async (values) => {
          if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
          }

          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <RegisterForm>
          {/*<RegisterEmail name="name" type="text" />*/}
          <Field
            name="email"
            type="email"
            placeholder="Email address"
            as={RegisterInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            as={RegisterInput}
          />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            as={RegisterInput}
          />
          <RegisterButton type="submit">Register</RegisterButton>
        </RegisterForm>
      </Formik>
      <Subtitle>
        Already have an account? <Link to={"/login"}>Login</Link>
      </Subtitle>
    </BoulderUploadWrapper>
  );
}

export default Register;
