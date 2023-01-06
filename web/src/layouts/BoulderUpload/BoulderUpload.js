import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";
import BoulderUploadMap from "../../components/BoulderUploadMap";
import { createBoulder } from "./boulderUploadApi";
import { RatingSelect } from "./RatingSelect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const BoulderUploadWrapper = styled.div`
  width: 100vw;
  background-color: black;
  margin-top: 40px;
  padding: 20px 15px 15px;
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
  padding-top: 10px;
`;

const UploadImageWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px dashed #aaa;
  background-color: #222;
  width: 100%;
  aspect-ratio: 1;
  margin: 0 auto 20px;

  span {
    color: white;
    width: 100%;
    font-size: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }

  input {
    background-color: lime;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const BoulderUploadSelect = styled.select`
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: #222;
  color: #eee;
  font-size: 20px;
  margin: 0 auto 20px;
  padding: 10px;
`;

const Label = styled.label`
  color: #eee;
  font-size: 16px;
  margin-bottom: 5px;
`

const SubmitButton = styled.button`
  width: 100%;
  border-radius: 10px;
  border: none;
  background: linear-gradient(-45deg, #0072ff, #00c6ff);
  color: #eee;
  font-size: 20px;
  margin: 0 auto 20px;
  padding: 10px 0;
  
  &:disabled {
    background: linear-gradient(-45deg, #555, #555);
  }
  
  // spinning svg
  svg {
    animation: spin 1s linear infinite;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  
  
`



export function BoulderUpload() {
  const [file, setFile] = useState();
  const [value, setValue] = useState({ y: 0.5, x: 0.5 });
  const [boulderRating, setBoulderRating] = useState("GREEN");
  const [location, setLocation] = useState("CAVE");
  const [holdColor, setHoldColor] = useState("WHITE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const x = await createBoulder({
      xLocation: value.x * 100,
      yLocation: value.y * 100,
      location: location,
      rating: boulderRating,
      holdColor: holdColor,
      file,
    });
    setIsSubmitting(false);
    // Redirect to boulder-page
    window.location.href = `/boulder/${x}`;
  };

  return (
    <>
      <Header />
      <BoulderUploadWrapper>
        <Title>Upload Boulder</Title>
        <BoulderUploadForm onSubmit={submit}>
          <Label>Select Rating</Label>
          <RatingSelect
            boulderRating={boulderRating}
            setBoulderRating={setBoulderRating}
          />
          <Label>Select Start Location</Label>
          <BoulderUploadMap
            input={{ boulderRating, value, onChange: setValue }}
            boulderRating={boulderRating}
          />
          <Label>Add Primary Image</Label>
          <UploadImageWrapper>
            {file ? (<UploadImage src={URL.createObjectURL(file)} />) :(
              <>
                <span>Click to upload photo</span>
                <input
                  filename={file}
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                ></input>
              </>
            )}
          </UploadImageWrapper>
          <Label>Select Gym Area</Label>
          <BoulderUploadSelect
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
          </BoulderUploadSelect>
          <Label>Select Hold Color</Label>
          <BoulderUploadSelect
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
          </BoulderUploadSelect>
          {isSubmitting ? (
            <SubmitButton disabled>
              <FontAwesomeIcon icon={faSpinner}/>
            </SubmitButton>
          ) : (
            <SubmitButton type="submit">Submit</SubmitButton>)
          }
        </BoulderUploadForm>
      </BoulderUploadWrapper>
    </>
  );
}

export default BoulderUpload;
