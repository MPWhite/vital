import React from "react";
import { BoulderPage } from "./layouts/BoulderPage/BoulderPage";
import { UserPage } from "./layouts/UserPage/UserPage";
import { Register } from "./layouts/Register/Register";
import { Login } from "./layouts/Login/Login";
import BoulderMap from "./layouts/BoulderMap/BoulderMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "./components/Header/Header";
import { AuthProvider } from "./components/Auth/AuthContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<BoulderMap />} />
            <Route path={"/boulder/:boulderId"} element={<BoulderPage />} />
            <Route path={"/user/:userId"} element={<UserPage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            {/*TEST*/}
            <Route path={"/header"} element={<Header />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
}

export default App;
