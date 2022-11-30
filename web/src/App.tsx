import React from "react";
import BoulderUpload from "./layouts/BoulderUpload/BoulderUpload";
import { BoulderPage } from "./layouts/BoulderPage/BoulderPage";
import { UserPage } from "./layouts/UserPage/UserPage";
import { Login } from "./layouts/Login/Login";
import styled from "styled-components";
import BoulderMap from "./layouts/BoulderMap/BoulderMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<BoulderMap />} />
        {/*<Route path={"/"} element={<BoulderUpload />} />*/}
        <Route path={"/boulder"} element={<BoulderPage />} />
        <Route path={"/user"} element={<UserPage />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
