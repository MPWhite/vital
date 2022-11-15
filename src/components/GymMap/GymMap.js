import React from "react";
import "./GymMap.scss";
import { mockData } from "../../mock/mock-data";
import classnames from "classnames";

const Pin = ({ x, y, color, active }) => {
  return (
    <div
      className={classnames("GymMap__Pin", { "GymMap__Pin--active": active })}
      style={{
        left: x,
        bottom: y,
        backgroundColor: color,
      }}
    />
  );
};

const GymMap = ({ boulderId }) => {
  return (
    <div className="GymMap">
      <img src="./gymMap.png" />
      {mockData.map((b) => (
        <Pin
          x={b.location.x}
          y={b.location.y}
          color={b.rating}
          active={b.id === boulderId}
        />
      ))}
    </div>
  );
};

export default GymMap;
