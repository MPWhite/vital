import React from "react";
import "./GymMap.scss";
import classnames from "classnames";
import { BoulderDescription } from "@backend/boulders.types";

const Pin = ({
  x,
  y,
  color,
  active,
}: {
  x: number;
  y: number;
  color: string;
  active: boolean;
}) => {
  return (
    <div
      className={classnames("GymMap__Pin", { "GymMap__Pin--active": active })}
      style={{
        left: `${x}%`,
        bottom: `${y}%`,
        backgroundColor: color,
      }}
    />
  );
};

const GymMap = ({
  activePinId,
  boulders,
}: {
  activePinId: string;
  boulders: Array<BoulderDescription>;
}) => {
  return (
    <div className="GymMap">
      <img src="/gymMap.png" alt="TODO" />
      {boulders.map((b) => (
        <Pin
          x={b.xLocation}
          y={b.yLocation}
          color={b.rating}
          active={b.id === activePinId}
        />
      ))}
    </div>
  );
};

export default GymMap;
