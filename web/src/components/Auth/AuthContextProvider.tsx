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
  return { token: loginResponse.data.access_token, user: loginResponse.data.user };
};

const refreshRequest = async () => {
  // it is important that you use axios when fetching the refresh-token, that way we know the cookie
  // with the refresh-token is included
  // const { token, ...otherDataYouMightNeed } = await axios.get(
  //   "/your-refresh-token-endpoint"
  // );
  return { token: "123" };
};

export const AuthContext = createContext({ token: 12 });

export function AuthProvider(props: any) {
  const accessTokenRef = useRef<string>();

  const loginQuery = useMutation(loginRequest, {
    onSuccess: (data) => {
      accessTokenRef.current = data.token;
    },
  });

  // const refreshQuery = useMutation(refreshRequest, {
  //   onSuccess: (data) => {
  //     // the refresh-token request should return similiar data as the loginRequest.
  //     accessTokenRef.current = data.token;
  //     setTokenExpires(data.tokenExpires);
  //   },
  //   // here we set a refetch-interval to avoid us sending a request without a valid access token.
  //   // you can either hardcode this value or calculate the diff until your token expires.
  //   refetchInterval: 300000,
  // });

  const login = async (email: string, password: string) => {
    // TODO -- add error handling to display message
    await loginQuery.mutateAsync({ loginData: email, password });
  };

  const logout = () => {
    // here you should send a request to your backend to invalidate the refresh-token
    // and then set the accessTokenRef to undefined.
    loginQuery.reset();
    accessTokenRef.current = undefined;
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

  const isSuccess = loginQuery.isSuccess;
  console.log(isSuccess)
  const isAuthenticated = isSuccess && !!accessTokenRef.current;
  console.log(isAuthenticated)
  // if you need a user object you can do something like this.
  // @ts-ignore
  const user = loginQuery.data?.user;
  // const user = { name: "test" };

  // example on provider
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
