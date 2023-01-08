import React from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import {Link, useNavigate} from "react-router-dom";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
  cursor: pointer;
  
`;

const RegisterForm = styled.form`
  padding: 20px;
`;

// TODO -- move into an auth api module. Perhaps into something like the API Auth Provider

const register = async ({ email, password, name }) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
  return response.json();
}

export function Register() {
  const navigate = useNavigate()
  return (
    <BoulderUploadWrapper>
      <Title>Create new account</Title>
      <Subtitle>Please fill in the form to continue</Subtitle>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "", name: "", betaKey: "" }}
        onSubmit={async (values) => {
          const { email, password, confirmPassword, betaCode } = values;
          if (betaCode !== "iknowmatt") {
            alert("Invalid beta code");
            return;
          }
          if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
          }
          try {
            const x = await register({ email, password, name: values.name });
            console.log(x)
            // navigate("/login")
          } catch (e) {
            alert("Error registering");
          }
        }}
      >
        {({handleSubmit, isSubmitting}) => (
          <RegisterForm onSubmit={handleSubmit}>
            {/*<RegisterEmail name="name" type="text" />*/}
            <Field
              name="email"
              type="email"
              placeholder="Email address"
              as={RegisterInput}
            />
            <Field
              name="name"
              type="name"
              placeholder="Name"
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
            <Field
              name="betaCode"
              type="text"
              placeholder="Beta code"
              as={RegisterInput}
            />
            <RegisterButton type="submit">
              {isSubmitting ? (
                <FontAwesomeIcon icon={faSpinner}/>
              ) : "Register"}
            </RegisterButton>
          </RegisterForm>
        )}
      </Formik>
      <Subtitle>
        Already have an account? <Link to={"/login"}>Login</Link>
      </Subtitle>
    </BoulderUploadWrapper>
  );
}

export default Register;
