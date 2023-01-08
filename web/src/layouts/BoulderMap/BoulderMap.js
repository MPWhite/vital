import React, { useState } from "react";
import CardCarousel from "../../components/CardCarousel";
import GymMap from "../../components/GymMap";
import styled from "styled-components";
import { BoulderMapFilter } from "./BoulderMapFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchBoulders } from "./boulderMapApi";
import { useQuery } from "@tanstack/react-query";
import {Header} from "../../components/Header/Header";
import {useQueryState} from "../../hooks/useQueryState";

const BoulderMapWrapper = styled.div`
  display: flex;
  flex-flow: column;
  background-color: black;
  height: 100vh;
  height: -webkit-fill-available;
`;

const GymMapWrapper = styled.div`
  width: 100vw;
  flex-grow: 1;
`;

const SpacerDiv = styled.div`
  height: 60px;
`;

const CardCarouselWrapper = styled.div`
  width: 100vw;
`;

const DummyHeader = styled.div`
  height: 40px;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #222;
  position: fixed;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;

  span {
    color: white;
    font-size: 16px;
    font-weight: 900;
    line-height: 40px;
    margin-left: 10px;
  }

  svg {
    margin-top: 8px;
    color: white;
    height: 24px;
    margin-right: 10px;
  }
`;

export const BoulderMap = () => {
  const [activePinId, setActivePinId] = useState(1);
  const { data: boulders, status } = useQuery(["boulders"], fetchBoulders);
  const [selectedRatings, setSelectedRatings] = React.useState([]);
  const [selectedLocations, setSelectedLocations] = React.useState([]);

  let filteredBoulders = boulders;
  if (selectedRatings.length) {
    filteredBoulders = boulders.filter((boulder) => {
      return selectedRatings.includes(boulder.rating.toLowerCase());
    });
  }

  if (selectedLocations.length) {
    filteredBoulders = filteredBoulders.filter((boulder) => {
      return selectedLocations
        .map((s) => s.toUpperCase())
        .includes(boulder.location.toUpperCase());
    });
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <Header />
      <BoulderMapWrapper>
        <GymMapWrapper color={"yellow"}>
          <SpacerDiv />
          <GymMap activePinId={activePinId} boulders={boulders} />
        </GymMapWrapper>
        <CardCarouselWrapper>
          <CardCarousel
            activePinId={activePinId}
            setActivePinId={setActivePinId}
            boulders={filteredBoulders}
          />
        </CardCarouselWrapper>
        <BoulderMapFilter
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </BoulderMapWrapper>
    </>
  );
};

export default BoulderMap;
