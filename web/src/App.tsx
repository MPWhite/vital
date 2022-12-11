import React from "react";
import { BoulderPage } from "./layouts/BoulderPage/BoulderPage";
import { UserPage } from "./layouts/UserPage/UserPage";
import { Register } from "./layouts/Register/Register";
import { Login } from "./layouts/Login/Login";
import BoulderMap from "./layouts/BoulderMap/BoulderMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header/Header";
import { AuthProvider } from "./components/Auth/AuthContextProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBar } from "./components/ErrorBar/ErrorBar";
import { ErrorProvider } from "./components/ErrorBar/ErrorContextProvider";
import { UserSettings } from "./layouts/UserSettings/UserSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function App() {
  return (
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorProvider>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<BoulderMap />} />
              <Route path={"/boulder/:boulderId"} element={<BoulderPage />} />
              <Route path={"/user/:userId"} element={<UserPage />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/settings"} element={<UserSettings />} />
              {/*TEST*/}
            </Routes>
          </BrowserRouter>
          {/*<ReactQueryDevtools initialIsOpen />*/}
          <ErrorBar />
        </ErrorProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
