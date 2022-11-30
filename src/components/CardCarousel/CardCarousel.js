import React, { useEffect, useRef, useState } from "react";
import "./CardCarousel.scss";
import BoulderCard from "../BoulderCard";
import { mockData } from "../../mock/mock-data";
import _ from "lodash";
import styled from "styled-components";

const Card = (props) => {
  const ref = useRef();
  return (
    <div ref={ref} className="Card">
      {props.children}
    </div>
  );
};

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  });
  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);
  return isIntersecting;
};

const CarouselWrapper = styled.div``;

const CardCarousel = ({ activePinId, setActivePinId }) => {
  const numChildren = mockData.length;
  const ref = useRef();
  const childrenCards = mockData.map((b) => {
    return (
      <Card>
        <BoulderCard
          ref={ref}
          title={b.title}
          imgSrc={b.img}
          holdColor={b.holds}
          ratingColor={b.rating}
          active={b.id === activePinId}
        />
      </Card>
    );
  });
  const handleScroll = (e) => {
    // Find the active element by measuring which one is closest to center
    // of the screen
    const widthPerChildren = ref.current.scrollWidth / numChildren;
    const eleIdx = Math.round(ref.current.scrollLeft / widthPerChildren);
    const eleId = mockData[eleIdx].id;
    setActivePinId(eleId);
  };

  return (
    <CarouselWrapper>
      <div
        ref={ref}
        className="CarouselWrapper"
        onScroll={_.debounce(handleScroll, 10)}
      >
        {childrenCards}
      </div>
    </CarouselWrapper>
  );
};

export default CardCarousel;
