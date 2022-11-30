import React from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
  cursor: pointer;
  color: white;
`;

const LoginForm = styled.form`
  padding: 20px;
`;

// TODO(!) Move this to another file
const postLogin = async (email, password) => {
  console.log(email);
  console.log(password);
  const resp = await axios.post("/api/auth/login", {
    email: email,
    password: "password",
  });
  return resp.data;
};

export function Login() {
  const login = useMutation(postLogin, {
    onSuccess: (data) => {
      console.log(JSON.stringify(data));
    },
  });

  return (
    <BoulderUploadWrapper>
      <Title>Welcome Back!</Title>
      <Subtitle>Please sign in to your account</Subtitle>
      <Formik
        initialValues={{
          email: "mattp.white95+test-user-1@gmail.com",
          password: "password",
        }}
        validator={() => ({})}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(true);
          setTimeout(() => {
            login.mutate(values.email, values.password);
            setSubmitting(false);
          }, 1);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <LoginForm onSubmit={handleSubmit}>
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
            <LoginButton type="submit">
              {isSubmitting ? "Loading..." : "Sign In"}
            </LoginButton>
          </LoginForm>
        )}
      </Formik>
      <Subtitle>Don't have an account? Sign Up</Subtitle>
    </BoulderUploadWrapper>
  );
}

export default Login;
