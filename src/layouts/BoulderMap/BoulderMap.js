import React, { useState } from "react";
import CardCarousel from "../../components/CardCarousel";
import GymMap from "../../components/GymMap";
import styled from "styled-components";

const BoulderMapWrapper = styled.div`
  padding: 0;
  background-color: black;
`;

export const BoulderMap = () => {
  const [activePinId, setActivePinId] = useState(1);
  return (
    <BoulderMapWrapper>
      <GymMap activePinId={activePinId} />
      <CardCarousel activePinId={activePinId} setActivePinId={setActivePinId} />
    </BoulderMapWrapper>
  );
};

export default BoulderMap;
