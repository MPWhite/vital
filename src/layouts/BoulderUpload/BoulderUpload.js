import React, { useState } from "react";
import "./BoulderUpload.scss";
import "../../styles/generic.scss";
import classnames from "classnames";
import BoulderUploadMap from "../../components/BoulderUploadMap";
import ImageUpload from "../../components/ImageUpload";

const BoulderRatingField = ({ input: { value, onChange } }) => {
  const getClassName = (val) =>
    classnames("RatingSelection__Option", {
      "RatingSelection__Option--active": value === val,
    });

  return (
    <div className="BoulderUpload">
      <div className="RatingSelection">
        <div
          className={getClassName("green")}
          onClick={() => onChange("green")}
        >
          <div className="bg-green" />
        </div>
        <div
          className={getClassName("yellow")}
          onClick={() => onChange("yellow")}
        >
          <div className="bg-yellow" />
        </div>
        <div
          className={getClassName("orange")}
          onClick={() => onChange("orange")}
        >
          <div className="bg-orange" />
        </div>
        <div className={getClassName("red")} onClick={() => onChange("red")}>
          <div className="bg-red" />
        </div>
        <div
          className={getClassName("purple")}
          onClick={() => onChange("purple")}
        >
          <div className="bg-purple" />
        </div>
        <div
          className={getClassName("black")}
          onClick={() => onChange("black")}
        >
          <div className="bg-black" />
        </div>
        <div
          className={getClassName("white")}
          onClick={() => onChange("white")}
        >
          <div className="bg-white" />
        </div>
      </div>
    </div>
  );
};

let BoulderUpload = () => {
  return (
    <div>
      {/*<Header/>*/}
      <div className="PageContent">
        <form className="BoulderUpload">
          <h1>Upload New Boulder</h1>
          <h3>Select Rating</h3>
          {/*TODO(!)*/}
          {/*<Field name="boulderRating" component={BoulderRatingField} />*/}
          <h3>Upload Image</h3>
          {/*TODO(!)*/}
          {/*<Field name="boulderImage" component={ImageUpload} />*/}
          {/*TODO(!)*/}
          {/*<Field name="boulderUploadMap" component={BoulderUploadMap} />*/}
          <button className="BoulderUpload__Submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BoulderUpload;
