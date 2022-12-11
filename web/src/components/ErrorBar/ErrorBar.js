import React from "react";
import "./ErrorBar.scss";
import styled from "styled-components";
import { useError } from "./ErrorContextProvider";

const ErrorBarDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffa5a5;
  color: #d8000c;
  text-align: center;
  height: 50px;
`;

export const ErrorBar = () => {
  const { error } = useError();

  if (!error) {
    return null;
  }

  return (
    <ErrorBarDiv>
      <p>{error}</p>
    </ErrorBarDiv>
  );
};
