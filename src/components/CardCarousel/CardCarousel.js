import React, { useEffect, useRef, useState } from "react";
import "./CardCarousel.scss";
import BoulderCard from "../BoulderCard";
import { mockData } from "../../mock/mock-data";
import _ from "lodash";

const Card = (props) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
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

const CardCarousel = ({ setActiveBoulderMap }) => {
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
    setActiveBoulderMap(eleId);
  };

  return (
    <div
      ref={ref}
      className="CarouselWrapper"
      onScroll={_.debounce(handleScroll, 50)}
    >
      {childrenCards}
    </div>
  );
};

export default CardCarousel;
