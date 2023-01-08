import React from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Auth/AuthContextProvider";
import { useAuth } from "../../components/Auth/hooks";
import { useError } from "../../components/ErrorBar/ErrorContextProvider";

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

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useError();

  return (
    <BoulderUploadWrapper>
      <Title>Welcome Back!</Title>
      <Subtitle>Please sign in to your account</Subtitle>
      <Formik
        initialValues={{
          email: "email",
          password: "",
        }}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values);
            navigate("/");
          } catch (error) {
            showError(error.message);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <LoginForm onSubmit={handleSubmit}>
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
      <Subtitle>
        Don't have an account? <Link to={"/register"}>Sign Up</Link>
      </Subtitle>
    </BoulderUploadWrapper>
  );
}

export default Login;
