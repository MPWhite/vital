import React from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";

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

const LoginInput = styled.input`
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

const LoginButton = styled.button`
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

const LoginForm = styled.div`
  padding: 20px;
`;

export function Login() {
  return (
    <BoulderUploadWrapper>
      <Title>Welcome Back!</Title>
      <Subtitle>Please sign in to your account</Subtitle>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <LoginForm>
          {/*<LoginEmail name="name" type="text" />*/}
          <Field
            name="email"
            type="email"
            placeholder="Email address"
            as={LoginInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            as={LoginInput}
          />
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>
      </Formik>
      <Subtitle>Don't have an account? Sign Up</Subtitle>
    </BoulderUploadWrapper>
  );
}

export default Login;
