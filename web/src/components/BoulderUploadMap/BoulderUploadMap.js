import React, { useEffect, useRef, useState } from "react";
import "./BoulderUploadMap.scss";
import styled from "styled-components";

const BoulderUploadMapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  margin: 0 auto 20px;
`;

const BoulderMap = styled.img`
  width: 100%;
  object-fit: contain;
`;

const Pin = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  transform: translate(-50%, 50%);
  background-color: ${(props) => props.rating};
  bottom: ${(props) => props.x};
  left: ${(props) => props.y};
  border-radius: 50%;
`;

const BoulderUploadMap = ({ boulderRating, input: { value, onChange } }) => {
  const ref = useRef();

  const handleClick = (evt) => {
    const clickFromTop =
      evt.clientY - (ref.current.offsetTop - window.pageYOffset);
    const clickFromLeft =
      evt.clientX - (ref.current.offsetLeft - window.pageXOffset);

    onChange({
      y: 1 - clickFromTop / ref.current.clientHeight,
      x: clickFromLeft / ref.current.clientWidth,
    });
  };

  const formatPercent = (p) => {
    return `${p * 100}%`;
  };

  return (
    <BoulderUploadMapWrapper
      ref={ref}
      className="BoulderUploadMap"
      onClick={handleClick}
    >
      <BoulderMap src="./gymMap.png" l alt="Broken: Requires Image" />
      <Pin
        y={formatPercent(value.x)}
        x={formatPercent(value.y)}
        rating={boulderRating}
      />
    </BoulderUploadMapWrapper>
  );
};

export default BoulderUploadMap;
