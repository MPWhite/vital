import React, { Component } from "react";
import "./FirstTimeModal.scss";

class FirstTimeModal extends Component {
  render() {
    const { closeModal } = this.props;
    return (
      <div className="FirstTimeModal">
        <div className="FirstTimeModal__card">
          <h1>Thanks for testing!</h1>
          <p>
            This is a tool I built to help find patterns between how I feel and
            how I spend my time. I thought it ended up being kinda valuable, so
            I wanted to see if it could help other people as well.
          </p>
          <p>
            It works by collecting data about three aspects of your life: how
            much you sleep, how much you work, and how your mood changes
            throughout the day.{" "}
          </p>
          <p>
            Originally I struggled to rememeber to keep track of these things
            myself, so I built a bot to text me and remind me. It works by
            texting me around the time I normally go to bed, and then records
            the time I respond to it. Same for waking up, starting work, and
            leaving work. For mood, it texts me randomly throughout the day, and
            records the number (1-10) I respond with.
          </p>
          <p>
            To use it, all you have to do is fill in the times you'd like it to
            text you and respond when it does. You can then see data
            visualizations of how you're doing by clicking the links on the
            left.
          </p>
          <div className="FirstTimeModal__card__button" onClick={closeModal}>
            <p>Get Started</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FirstTimeModal;
