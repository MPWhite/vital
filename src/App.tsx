import React from "react";
import BoulderUpload from "./layouts/BoulderUpload/BoulderUpload";
import { BoulderPage } from "./layouts/BoulderPage/BoulderPage";
import { UserPage } from "./layouts/UserPage/UserPage";
import styled from "styled-components";
import BoulderMap from "./layouts/BoulderMap/BoulderMap";

function App() {
  return (
    <div>
      {/*<BoulderPage />*/}
      {/*<UserPage />*/}
      <BoulderMap />
    </div>
  );
}

export default App;
