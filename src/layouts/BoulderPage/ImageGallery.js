import React from "react";
import styled from "styled-components";

const ImageGalleryDiv = styled.div`
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  position: relative;

  div {
    scroll-snap-align: center;
  }

  img {
    width: 100vw;
    aspect-ratio: 1;
  }

  video {
    width: 100vw;
    background-color: black;
    aspect-ratio: 1;
  }
`;

export function ImageGallery() {
  return (
    <ImageGalleryDiv>
      <div>
        <img src="/boulder-image-1.png" alt="tmp" />
      </div>
      <div>
        <video src="/climb.mp4" controls />
      </div>
    </ImageGalleryDiv>
  );
}
