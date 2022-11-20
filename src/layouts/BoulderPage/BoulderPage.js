import React from "react";
import "./BoulderPage.scss";
import classnames from "classnames";
import Confetti from "react-dom-confetti";

function ImageGallery() {
  return (
    <div className="ImageGallery">
      <div>
        <img src="/boulder-image-1.png" alt="tmp" />
      </div>
      <div>
        <video src="/climb.mp4" controls />
      </div>
    </div>
  );
}

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

function Buttons() {
  const [attemptCount, setAttemptCount] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);

  return (
    <div className="Section__FlexSubsection BoulderPageButtons">
      <button
        onClick={() => {
          setAttemptCount(attemptCount + 1);
        }}
        className={classnames("", {
          "BoulderAttemptedButton--completed": isCompleted,
          NotCompletedButton: !isCompleted,
        })}
      >
        Attempted ({attemptCount})
      </button>
      <button
        onClick={() => {
          setIsCompleted(!isCompleted);
        }}
        className={classnames("", {
          "BoulderCompletedButton--completed": isCompleted,
          "BoulderCompletedButton--not-completed": !isCompleted,
          NotCompletedButton: !isCompleted,
        })}
        {...(isCompleted ? { disabled: true } : {})}
      >
        {isCompleted ? "Completed!" : "Completed"}
      </button>
      <Confetti active={isCompleted} config={config} />
    </div>
  );
}

export function BoulderPage() {
  return (
    <div className="BoulderPage">
      <ImageGallery />
      <div className="Content">
        <div className="BoulderPage__Description">
          <span className="BoulderPage__Description__Title">
            Megatron (but harder)
          </span>
          <span className="BoulderPage__Description__Subtitle">
            Named by: Matt
          </span>
          <div className="BoulderPage__PillContainer">
            <div className="BoulderPage__Pill">Crimps</div>
            <div className="BoulderPage__Pill">Heel hooks</div>
            <div className="BoulderPage__Pill">Dyno</div>
          </div>
        </div>
        <div className="Section">
          <span className="Section__Title">Boulder Stats</span>
          <div className="Section__FlexSubsection">
            <div className="StatCard">
              <span className="StatCard__Title">Completion</span>
              <span className="StatCard__Value">89%</span>
            </div>
            <div className="StatCard">
              <span className="StatCard__Title">Avg Attempts</span>
              <span className="StatCard__Value">13</span>
            </div>
            <div className="StatCard">
              <span className="StatCard__Title">Elo</span>
              <span className="StatCard__Value">3124.2</span>
            </div>
          </div>
        </div>
        <div className="Section">
          <span className="Section__Title">Recorded Sends</span>
          <div className="Section__FlexSubsection">
            <div className="SendPill">
              <div className="SendPill__Image">
                <img src="/sarah.png" alt="tmp" />
              </div>
              <span>Sarah Olijar</span>
            </div>
            <div className="SendPill">
              <div className="SendPill__Image">
                <img src="/trevor.jpg" alt="tmp" />
              </div>
              <span>Trevor Frey</span>
            </div>
            <div className="SendPill">
              <div className="SendPill__Image">
                <img src="/aron.jpg" alt="tmp" />
              </div>
              <span>Aron Korenblit</span>
            </div>
            <div className="SendPill">
              <div className="SendPill__Image">
                <img src="/matt.jpg" alt="tmp" />
              </div>
              <span>Matt White</span>
            </div>
          </div>
        </div>
        <div className="Section">
          <Buttons />
        </div>
      </div>
    </div>
  );
}
