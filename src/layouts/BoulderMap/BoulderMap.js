import React, { useState } from "react";
import CardCarousel from "../../components/CardCarousel";
import GymMap from "../../components/GymMap";
import styled from "styled-components";
import { BoulderMapFilter } from "./BoulderMapFilter";

const BoulderMapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const DummyHeader = styled.div`
  height: 50px;
  width: 100vw;
  background-color: #1098f7;
`;

export const BoulderMap = () => {
  const [activePinId, setActivePinId] = useState(1);
  return (
    <>
      <DummyHeader />
      <BoulderMapWrapper>
        <GymMap activePinId={activePinId} />
        <CardCarousel
          activePinId={activePinId}
          setActivePinId={setActivePinId}
        />
        <BoulderMapFilter />
      </BoulderMapWrapper>
    </>
  );
};

export default BoulderMap;
