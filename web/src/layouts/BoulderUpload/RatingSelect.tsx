import React from "react";
import styled from "styled-components";

const RatingSelectDiv = styled.div`
  background-color: #333;
  display: flex;
  justify-content: space-around;
  padding: 8px;
  border-radius: 50px;
    margin-bottom: 20px;
`;

const RatingSelectOption = styled.div<any>`
  background-color: ${(props) => props.rating};
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.selected ? "lime" : props.rating)};
`;

export const RatingSelect = ({ boulderRating, setBoulderRating }: any) => {
  return (
    <RatingSelectDiv>
      <RatingSelectOption
        rating={"GREEN"}
        selected={boulderRating === "GREEN"}
        onClick={() => setBoulderRating("GREEN")}
      />
      <RatingSelectOption
        rating={"YELLOW"}
        selected={boulderRating === "YELLOW"}
        onClick={() => setBoulderRating("YELLOW")}
      />
      <RatingSelectOption
        rating={"ORANGE"}
        selected={boulderRating === "ORANGE"}
        onClick={() => setBoulderRating("ORANGE")}
      />
      <RatingSelectOption
        rating={"RED"}
        selected={boulderRating === "RED"}
        onClick={() => setBoulderRating("RED")}
      />
      <RatingSelectOption
        rating={"PURPLE"}
        selected={boulderRating === "PURPLE"}
        onClick={() => setBoulderRating("PURPLE")}
      />
      <RatingSelectOption
        rating={"BLACK"}
        selected={boulderRating === "BLACK"}
        onClick={() => setBoulderRating("BLACK")}
      />
      <RatingSelectOption
        rating={"WHITE"}
        selected={boulderRating === "WHITE"}
        onClick={() => setBoulderRating("WHITE")}
      />
    </RatingSelectDiv>
  );
};
