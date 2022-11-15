import React, { useEffect, useRef, useState } from "react";
import "./BoulderUploadMap.scss";
import "../../styles/generic.scss";

const ratingToClass = {
  green: "bg-green",
  yellow: "bg-yellow",
  orange: "bg-orange",
  red: "bg-red",
  purple: "bg-purple",
  black: "bg-black",
  white: "bg-white",
};

const BoulderUploadMap = ({ boulderRating, input: { value, onChange } }) => {
  const ref = useRef();

  const ratingClass = boulderRating ? ratingToClass[boulderRating] : "";

  const handleClick = (evt) => {
    const clickFromTop =
      evt.clientY - (ref.current.offsetTop - window.pageYOffset);
    const clickFromLeft =
      evt.clientX - (ref.current.offsetLeft - window.pageXOffset);

    onChange({
      top: clickFromTop / ref.current.clientHeight,
      left: clickFromLeft / ref.current.clientWidth,
    });
  };

  const formatPercent = (p) => {
    return `${p * 100}%`;
  };

  const className = `BoulderUploadMap__Pin ${ratingClass}`;
  return (
    <>
      <h3>Set Gym Location</h3>
      <div ref={ref} className="BoulderUploadMap" onClick={handleClick}>
        <img src="./gymMap.png" alt="Broken: Requires Image" />
        <div
          className={className}
          style={{
            top: formatPercent(value.top),
            left: formatPercent(value.left),
          }}
        />
      </div>
    </>
  );
};

export default BoulderUploadMap;
