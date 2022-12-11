import React from "react";
import { createContext, useState } from "react";

export const ErrorContext = createContext({});

export function ErrorProvider(props: any) {
  const [error, setError] = useState<string>();

  const showError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  return (
    <ErrorContext.Provider
      value={{
        error,
        showError,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
}

export const useError = (): {
  error: string | undefined;
  showError: (error: string) => void;
} => {
  const context = React.useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("ErrorContext must be within ErrorProvider");
  }

  // @ts-ignore
  return context;
};
