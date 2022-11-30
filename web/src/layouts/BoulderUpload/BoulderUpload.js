import React, { useState } from "react";
import styled from "styled-components";

const BoulderUploadWrapper = styled.div`
  width: 100vw;
  background-color: black;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #eee;
`;

export function BoulderUpload() {
  return (
    <BoulderUploadWrapper>
      <Title>Upload a new boulder</Title>
    </BoulderUploadWrapper>
  );
}

export default BoulderUpload;
