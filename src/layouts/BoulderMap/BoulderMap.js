import React, { useState } from "react";
import "./BoulderMap.scss";
import CardCarousel from "../../components/CardCarousel";
import GymMap from "../../components/GymMap";

const BoulderMap = () => {
  const [activePinId, setActivePinId] = useState(1);
  return (
    <div className="BoulderMap">
      <div className="BoulderFilter">TODO - add filter block</div>
      <GymMap activePinId={activePinId} />
      <CardCarousel activePinId={activePinId} setActivePinId={setActivePinId} />
    </div>
  );
};

export default BoulderMap;
