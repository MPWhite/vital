import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { configure } from "axios-hooks";

const loginRequest = async ({
  loginData,
}: {
  loginData: { email: string; password: string };
}) => {
  const loginResponse = await axios.post("/api/auth/login", loginData);
  const resp = {
    token: loginResponse.data.access_token,
    user: loginResponse.data.user,
  };
  localStorage.setItem("authToken", resp.token);
  localStorage.setItem("user.id", resp.user.id);
  localStorage.setItem("user.displayName", resp.user.displayName);
  localStorage.setItem("user.profilePicUrl", resp.user.profilePicUrl);
  return resp;
};

export const AuthContext = createContext({});

export function AuthProvider(props: any) {
  const accessTokenRef = useRef<string>();

  const loginQuery = useMutation(["login"], loginRequest, {
    onSuccess: (data) => {
      accessTokenRef.current = data.token;
    },
  });

  const login = async (loginData: { email: string; password: string }) => {
    // TODO -- add error handling to display message
    console.log("FINDME");
    await loginQuery.mutateAsync({ loginData });
  };

  const logout = () => {
    // here you should send a request to your backend to invalidate the refresh-token
    // and then set the accessTokenRef to undefined.
    loginQuery.reset();
    accessTokenRef.current = undefined;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   // add authorization token to each request
  //   axios.interceptors.request.use(
  //     (config: AxiosRequestConfig): AxiosRequestConfig => {
  //       config.baseURL = "http://localhost:3000";
  //       // @ts-ignore
  //       config.headers.authorization = `Bearer ${accessTokenRef.current}`;
  //       // this is important to include the cookies when we are sending the requests to the backend.
  //       config.withCredentials = true;
  //       return config;
  //     }
  //   );
  //
  //   axios.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       return Promise.reject(error);
  //     }
  //   );
  //
  //   // configure axios-hooks to use this instance of axios
  //   configure({ axios });
  // }, []);

  const authToken = localStorage.getItem("authToken");
  const user = {
    id: localStorage.getItem("user.id"),
    displayName: localStorage.getItem("user.displayName"),
    profilePicUrl: localStorage.getItem("user.profilePicUrl"),
  };
  const isAuthenticated = authToken && user;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
      {...props}
    ></AuthContext.Provider>
  );
}
