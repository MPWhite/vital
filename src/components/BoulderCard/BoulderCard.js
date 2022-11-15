import React from "react";
import "./BoulderCard.scss";

const BoulderCard = ({ title, imgSrc, holdColor, ratingColor }) => {
  return (
    <div className="BoulderCard">
      <div className="BoulderCard__Image">
        <img src={imgSrc} alt="tmp" />
      </div>
      <div className="BoulderCard__Description">
        <span className="BoulderCard__Description__Title">{title}</span>
        <div className="BoulderCard__Metadata">
          <div
            className="BoulderCard__Metadata__Circle"
            style={{ backgroundColor: holdColor }}
          />
          <span>Holds</span>
        </div>
        <div className="BoulderCard__Metadata">
          <div
            className="BoulderCard__Metadata__Circle"
            style={{ backgroundColor: ratingColor }}
          />
          <span>Rating</span>
        </div>
        <div className="BoulderCard__Metadata">
          <div
            className="BoulderCard__Metadata__Circle"
            style={{ backgroundColor: "white" }}
          />
          <span>Sender</span>
        </div>
      </div>
    </div>
  );
};

export default BoulderCard;
