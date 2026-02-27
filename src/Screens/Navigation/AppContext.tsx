// AppContext.tsx
import React, {createContext, useState, ReactNode} from 'react';

type AppState = {
  isSplash1Done: boolean;
  isSplash2Done: boolean;
  isLanguageSelected: boolean;
};

type AppContextType = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  authFlowType: AuthFlowType;
  setAuthFlow: React.Dispatch<React.SetStateAction<AuthFlowType>>;
};

type AuthFlowType = 'forgotPassword' | 'forgotUserId' | null;

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [appState, setAppState] = useState<AppState>({
    isSplash1Done: false,
    isSplash2Done: false,
    isLanguageSelected: false,
  });
  const [authFlowType, setAuthFlow] = useState<AuthFlowType>(null);

  return (
    <AppContext.Provider
      value={{appState, setAppState, authFlowType, setAuthFlow}}>
      {children}
    </AppContext.Provider>
  );
};
