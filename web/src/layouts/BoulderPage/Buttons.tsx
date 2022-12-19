import React from "react";
import classnames from "classnames";
import Confetti from "react-dom-confetti";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptBoulder, completeBoulder } from "./bouldersApi";

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

const AttemptedButton = styled.button<any>`
  display: ${(props) => (props.completed ? "none" : "block")};
  background-color: #0072ff;
`;

const CompletedButton = styled.button<any>`
  position: absolute;
  left: ${(props) => (props.completed ? "10px" : "50%")};
  background-color: ${(props) => (props.completed ? "#239423" : "#0072ff")};
  width: ${(props) =>
    props.completed ? "calc(100% - 20px)" : "48%"} !important;
`;

export function Buttons({
  boulderId,
  attempts,
  completed,
}: {
  boulderId: string;
  attempts: number;
  completed: boolean;
}) {
  const [attemptCount, setAttemptCount] = React.useState(attempts);
  const [isCompleted, setIsCompleted] = React.useState(completed);

  const { mutate: attempt, isLoading: attemptLoading } = useMutation(
    attemptBoulder,
    {
      onSuccess: () => {
        setAttemptCount(attemptCount + 1);
      },
    }
  );

  const queryClient = useQueryClient();
  const { mutate: complete, isLoading: completeLoading } = useMutation(
    completeBoulder,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["boulder", boulderId] });
        setIsCompleted(true);
      },
    }
  );

  return (
    <BoulderPageButtons>
      <AttemptedButton
        completed={isCompleted}
        onClick={() => {
          attempt(boulderId);
        }}
      >
        {attemptLoading ? "Loading..." : `Attempted (${attemptCount})`}
      </AttemptedButton>
      <CompletedButton
        completed={isCompleted}
        onClick={() => {
          complete(boulderId);
        }}
        disabled={isCompleted}
      >
        {isCompleted ? "Completed!" : "Record Send"}
      </CompletedButton>
      <Confetti active={isCompleted} config={config} />
    </BoulderPageButtons>
  );
}
