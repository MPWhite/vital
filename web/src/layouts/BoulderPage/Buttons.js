import React from "react";
import classnames from "classnames";
import Confetti from "react-dom-confetti";
import styled from "styled-components";

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: "2290",
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const BoulderPageButtons = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;

  button {
    border: none;
    height: 45px;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    transition-property: width, left;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    width: 48%;
    cursor: pointer;
  }
`;

const AttemptedButton = styled.button`
  display: ${(props) => (props.completed ? "none" : "block")};
  background: linear-gradient(0deg, #0072ff, #00c6ff);
`;

const CompletedButton = styled.button`
  position: absolute;
  left: ${(props) => (props.completed ? "10px" : "50%")};
  background: ${(props) =>
    props.completed ? "#239423" : "linear-gradient(0deg, #0072ff, #00c6ff)"};
  width: ${(props) =>
    props.completed ? "calc(100% - 20px)" : "48%"} !important;
`;

export function Buttons() {
  const [attemptCount, setAttemptCount] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);

  return (
    <BoulderPageButtons>
      <AttemptedButton
        completed={isCompleted}
        onClick={() => {
          setAttemptCount(attemptCount + 1);
        }}
      >
        Record Attempt ({attemptCount})
      </AttemptedButton>
      <CompletedButton
        completed={isCompleted}
        onClick={() => {
          setIsCompleted(!isCompleted);
        }}
        disabled={isCompleted}
      >
        {isCompleted ? "Completed!" : "Record Send"}
      </CompletedButton>
      <Confetti active={isCompleted} config={config} />
    </BoulderPageButtons>
  );
}
