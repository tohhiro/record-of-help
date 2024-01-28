import React, { useState, createContext, useContext, PropsWithChildren } from 'react';

type AuthTokenProps = { accessToken: string };
type AuthContextProps = {
  authToken: AuthTokenProps;
  setAuthToken: React.Dispatch<React.SetStateAction<AuthTokenProps>>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<AuthTokenProps>({ accessToken: '' });

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>
  );
};

type AuthContextType = {
  get: () => AuthTokenProps;
  // eslint-disable-next-line no-unused-vars
  set: (props: AuthTokenProps) => void;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  return {
    get: () => context!.authToken,
    set: (props: AuthTokenProps) => context?.setAuthToken(props),
  };
};
