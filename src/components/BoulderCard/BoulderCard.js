import React from "react";
import classnames from "classnames";
import "./BoulderCard.scss";

const BoulderCard = ({ title, imgSrc, holdColor, ratingColor, active }) => {
  return (
    <div
      className={classnames("BoulderCard", { "BoulderCard--active": active })}
    >
      <div className="BoulderCard__Image">
        <div className="BoulderCard__Circle BoulderCard__Holds"></div>
        <div className="BoulderCard__Circle BoulderCard__HoldsBorder"></div>
        <div className="BoulderCard__Circle BoulderCard__Rating"></div>
        <img src={imgSrc} alt="tmp" />
      </div>
      <div className="BoulderCard__Description">
        <span className="BoulderCard__Description__Title">{title}</span>
        <span className="BoulderCard__Description__Subtitle">
          Named by: Matt
        </span>
        <div className="BoulderCard__PillContainer">
          <div className="BoulderCard__Pill">Crimps</div>
          <div className="BoulderCard__Pill">Heel hooks</div>
          <div className="BoulderCard__Pill">Dyno</div>
        </div>
      </div>
      {/*<div className="BoulderCard__ActionContainer">*/}
      {/*  <button>Record Send</button>*/}
      {/*</div>*/}
    </div>
  );
};

export default BoulderCard;
