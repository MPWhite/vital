import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BoulderCardDiv = styled.div`
  width: 250px;
  background-color: #222;
  border-radius: 10px;
  box-sizing: border-box;
  border: 2px solid ${(props) => (props.active ? "#1967fc" : "transparent")};
`;

const BoulderCardImage = styled.div`
  position: relative;
  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const BoulderCardDescription = styled.div`
  padding: 10px 10px 3px 10px;
  display: flex;
  flex-direction: column;
`;

const BoulderTitle = styled.span`
  font-weight: bolder;
  font-size: 12px;
  color: #eee;
`;

const BoulderSubtitle = styled.div`
  font-size: 10px;
  color: #999;
`;

const PillContainer = styled.div`
  margin-top: 5px;
  padding-bottom: 10px;
  display: flex;
`;

const Pill = styled.div`
  background-color: #444;
  font-size: 10px;
  margin: 3px;
  padding: 2px 5px 2px 5px;
  border-radius: 10px;
  color: white;
`;

const RatingMark = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.rating};
  top: 187px;
  right: 40px;
  border: 2px solid #222;
`;

const HoldMark = styled.div`
  position: absolute;
  top: 191px;
  right: 12px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #222;
  transform: scale(1.6);

  &:before {
    position: absolute;
    display: block;
    content: "";
    height: 20px;
    width: 20px;
    box-sizing: border-box;
    left: -10px;
    top: -1px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid ${(props) => props.holdColor};
    transform: scale(0.6);
  }
`;

const BoulderCard = ({
  boulderId,
  title,
  imgSrc,
  holdColor,
  rating,
  active,
  tags,
}) => {
  return (
    <Link to={`/boulder/${boulderId}`}>
      <BoulderCardDiv active={active}>
        <BoulderCardImage>
          <RatingMark rating={rating} />
          <HoldMark holdColor={holdColor} />
          <img src={imgSrc} alt="tmp" />
        </BoulderCardImage>
        <BoulderCardDescription>
          <BoulderTitle>{title}</BoulderTitle>
          <BoulderSubtitle>Named by: Matt</BoulderSubtitle>
          <PillContainer>
            {tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </PillContainer>
        </BoulderCardDescription>
      </BoulderCardDiv>
    </Link>
  );
};

export default BoulderCard;
