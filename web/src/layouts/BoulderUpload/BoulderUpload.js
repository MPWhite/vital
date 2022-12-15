import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";

const BoulderUploadWrapper = styled.div`
  width: 100vw;
  background-color: black;
  margin-top: 40px;

  img {
    height: 200px;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #eee;
`;

export function BoulderUpload() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    console.log(file);

    // Send the file and description to the server
  };

  return (
    <>
      <Header />
      <BoulderUploadWrapper>
        <Title>Upload a new boulder</Title>
        <form onSubmit={submit}>
          {file && <img src={URL.createObjectURL(file)} />}
          <input
            filename={file}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </BoulderUploadWrapper>
    </>
  );
}

export default BoulderUpload;
