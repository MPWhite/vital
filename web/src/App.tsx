import React from "react";
import { BoulderPage } from "./layouts/BoulderPage/BoulderPage";
import { UserPage } from "./layouts/UserPage/UserPage";
import { Register } from "./layouts/Register/Register";
import { Login } from "./layouts/Login/Login";
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
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
