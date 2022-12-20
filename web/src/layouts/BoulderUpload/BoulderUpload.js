import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";
import BoulderUploadMap from "../../components/BoulderUploadMap";

const BoulderUploadWrapper = styled.div`
  width: 100vw;
  background-color: black;
  margin-top: 40px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #eee;
`;

const UploadImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const BoulderUploadForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const UploadImageWrapper = styled.div`
  border-radius: 10px;
  border: 1px dashed #eee;
  height: 200px;
  width: 200px;
  margin: 0 auto;
`;

export function BoulderUpload() {
  const [file, setFile] = useState();
  const [value, setValue] = useState({ top: 0.5, left: 0.5 });
  const [boulderRating, setBoulderRating] = useState("green");

  console.log(value);

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
        <BoulderUploadForm onSubmit={submit}>
          <BoulderUploadMap
            input={{ boulderRating, value, onChange: setValue }}
          />
          <UploadImageWrapper>
            {file && <UploadImage src={URL.createObjectURL(file)} />}
          </UploadImageWrapper>
          <input
            filename={file}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
          <select>
            <option value="Training Cave">Training Cave</option>
            <option value="Competition Wall">Competition Wall</option>
            <option value="Cave">Cave</option>
            <option value="Alcove">Alcove</option>
            <option value="Arch">Arch</option>
            <option value="Amphitheater">Amphitheater</option>
            <option value="Topout">Topout</option>
          </select>
          <button type="submit">Submit</button>
        </BoulderUploadForm>
      </BoulderUploadWrapper>
    </>
  );
}

export default BoulderUpload;
