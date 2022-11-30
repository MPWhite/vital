import React from "react";
import BoulderMap from "./layouts/BoulderMap";
import BoulderUpload from "./layouts/BoulderUpload/BoulderUpload";
import { BoulderPage } from "./layouts/BoulderPage/BoulderPage";
import { UserPage } from "./layouts/UserPage/UserPage";
import styled from "styled-components";

function App() {
  return (
    <div>
      {/*<BoulderPage />*/}
      <UserPage />
    </div>
  );
}

export default App;
