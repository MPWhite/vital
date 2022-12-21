import React, { useEffect, useRef, useState } from "react";
import BoulderCard from "../BoulderCard/BoulderCard";
import _ from "lodash";
import { BoulderDescription } from "@backend/boulders.types";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
  padding: 0 140px 60px 50px;
`;

const CardDiv = styled.div`
  margin: 0 20px;
  scroll-snap-align: center;
`;

const Card = (props: any) => {
  const ref = useRef();
  return <CardDiv ref={ref}>{props.children}</CardDiv>;
};

const CardCarousel = ({
  activePinId,
  setActivePinId,
  boulders,
}: {
  activePinId: string;
  setActivePin: any;
  boulders: Array<BoulderDescription>;
}) => {
  const numChildren = boulders.length;
  const ref = useRef();
  const childrenCards = boulders.map((b) => {
    return (
      <Card key={b.id}>
        <BoulderCard
          boulderId={b.id}
          title={b.name}
          imgSrc={b.primaryPhotoUrl}
          holdColor={b.holdColor}
          rating={b.rating}
          active={b.id === activePinId}
          tags={b.tags}
        />
      </Card>
    );
  });
  const handleScroll = (e: any) => {
    // Find the active element by measuring which one is closest to center
    // of the screen
    const widthPerChildren = ref.current.scrollWidth / numChildren;
    const eleIdx = Math.round(ref.current.scrollLeft / widthPerChildren);
    const eleId = boulders[eleIdx].id;
    setActivePinId(eleId);
  };

  return (
    <CarouselWrapper ref={ref} onScroll={_.debounce(handleScroll, 10)}>
      {childrenCards}
    </CarouselWrapper>
  );
};

export default CardCarousel;
