import React, { useEffect, useRef, useState } from "react";
import "./BoulderUploadMap.scss";
import styled from "styled-components";

const BoulderUploadMapWrapper = styled.div`
  position: relative;
  width: 70%;
  height: fit-content;
  margin: 0 auto;
`;

const BoulderMap = styled.img`
  width: 100%;
  object-fit: contain;
`;

const Pin = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  background-color: red;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
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
      top: clickFromTop / ref.current.clientHeight,
      left: clickFromLeft / ref.current.clientWidth,
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
      <Pin top={formatPercent(value.top)} left={formatPercent(value.left)} />
    </BoulderUploadMapWrapper>
  );
};

export default BoulderUploadMap;
