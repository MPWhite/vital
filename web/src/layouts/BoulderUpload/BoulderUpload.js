import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";
import BoulderUploadMap from "../../components/BoulderUploadMap";
import { createBoulder } from "./boulderUploadApi";
import { RatingSelect } from "./RatingSelect";

const BoulderUploadWrapper = styled.div`
  width: 100vw;
  background-color: black;
  margin-top: 40px;
  padding: 10px;
  box-sizing: border-box;
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
`;

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
  const [value, setValue] = useState({ y: 0.5, x: 0.5 });
  const [boulderRating, setBoulderRating] = useState("GREEN");
  const [location, setLocation] = useState("CAVE");
  const [holdColor, setHoldColor] = useState("WHITE");

  const submit = async (event) => {
    event.preventDefault();
    await createBoulder({
      xLocation: value.x * 100,
      yLocation: value.y * 100,
      location: location,
      rating: boulderRating,
      holdColor: holdColor,
      file,
    });

    // Send the file and description to the server
  };

  return (
    <>
      <Header />
      <BoulderUploadWrapper>
        <Title>Upload a new boulder</Title>
        <BoulderUploadForm onSubmit={submit}>
          <RatingSelect
            boulderRating={boulderRating}
            setBoulderRating={setBoulderRating}
          />
          <BoulderUploadMap
            input={{ boulderRating, value, onChange: setValue }}
            boulderRating={boulderRating}
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
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="TRAINING_CAVE">Training Cave</option>
            <option value="COMPETITION_WALL">Competition Wall</option>
            <option value="CAVE">Cave</option>
            <option value="ALCOVE">Alcove</option>
            <option value="ARCH">Arch</option>
            <option value="AMPHITHEATER">Amphitheater</option>
            <option value="TOPOUT">Topout</option>
          </select>
          <select
            value={holdColor}
            onChange={(e) => setHoldColor(e.target.value)}
          >
            <option value="WHITE">White</option>
            <option value="RED">Red</option>
            <option value="BLUE">Blue</option>
            <option value="YELLOW">Yellow</option>
            <option value="BLACK">Black</option>
            <option value="GREEN">Green</option>
            <option value="ORANGE">Orange</option>
            <option value="PURPLE">Purple</option>
          </select>
          <button type="submit">Submit</button>
        </BoulderUploadForm>
      </BoulderUploadWrapper>
    </>
  );
}

export default BoulderUpload;
