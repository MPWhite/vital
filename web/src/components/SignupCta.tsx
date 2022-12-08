import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignUpCtaDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignUpCtaSpan = styled.span`
  color: #ccc;
  font-size: 12px;
  margin-bottom: 10px;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  box-sizing: border-box;
  background: linear-gradient(-45deg, #0072ff, #00c6ff);
  cursor: pointer;
  color: white;
`;

export function SignUpCta() {
  return (
    <SignUpCtaDiv>
      <SignUpCtaSpan>
        Create an account to record your attempts and track your sends!
      </SignUpCtaSpan>
      <Link to={"/register"}>
        <SignUpButton>Create account now!</SignUpButton>
      </Link>
    </SignUpCtaDiv>
  );
}
