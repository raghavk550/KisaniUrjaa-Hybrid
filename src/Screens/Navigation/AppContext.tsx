// AppContext.tsx
import React, {createContext, useState, ReactNode, useEffect} from 'react';
import {storage} from './Storage';

type AppState = {
  isSplash1Done: boolean;
  isSplash2Done: boolean;
  isLanguageSelected: boolean;
  isSignUp: boolean;
  isAccountCreated: boolean;
  isLogin: boolean;
};

type AuthFlowType = 'forgotPassword' | 'forgotUserId' | null;

type AppContextType = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  authFlowType: AuthFlowType;
  setAuthFlow: React.Dispatch<React.SetStateAction<AuthFlowType>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [appState, setAppState] = useState<AppState>({
    isSplash1Done: false,
    isSplash2Done: false,
    isLanguageSelected: false,
    isSignUp: false,
    isAccountCreated: false,
    isLogin: false,
  });

  const [authFlowType, setAuthFlow] = useState<AuthFlowType>(null);

  // 🔥 Load from storage ONCE on app start
  useEffect(() => {
    setAppState({
      isSplash1Done: storage.getBoolean('isSplash1Done') ?? false,
      isSplash2Done: storage.getBoolean('isSplash2Done') ?? false,
      isLanguageSelected: storage.getBoolean('isLanguageSelected') ?? false,
      isSignUp: storage.getBoolean('isSignUp') ?? false,
      isAccountCreated: storage.getBoolean('isAccountCreated') ?? false,
      isLogin: storage.getBoolean('isLogin') ?? false,
    });
  }, []);

  return (
    <AppContext.Provider
      value={{appState, setAppState, authFlowType, setAuthFlow}}>
      {children}
    </AppContext.Provider>
  );
};
