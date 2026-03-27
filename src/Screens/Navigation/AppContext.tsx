// AppContext.tsx
import React, {createContext, useState, ReactNode, useEffect} from 'react';
import {storage} from './Storage';
import { User } from '../../Helper/ApiService/LoginApi';

type AppState = {
  isSplash1Done: boolean;
  isSplash2Done: boolean;
  isLanguageSelected: boolean;
  isLogin: boolean;
};

type AuthFlowType = 'forgotPassword' | 'forgotUserId' | null;

type AppContextType = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  authFlowType: AuthFlowType;
  setAuthFlow: React.Dispatch<React.SetStateAction<AuthFlowType>>;
  user: {user: User; token: string} | null;
  setUser: React.Dispatch<React.SetStateAction<{user: User; token: string} | null>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [appState, setAppState] = useState<AppState>({
    isSplash1Done: false,
    isSplash2Done: false,
    isLanguageSelected: false,
    isLogin: false,
  });

  const [user, setUser] = useState<{user: User; token: string} | null>(null);

  const [authFlowType, setAuthFlow] = useState<AuthFlowType>(null);

  // 🔥 Load from storage ONCE on app start
  useEffect(() => {
    const storedUser = storage.getString('user');

    setAppState({
      isSplash1Done: storage.getBoolean('isSplash1Done') ?? false,
      isSplash2Done: storage.getBoolean('isSplash2Done') ?? false,
      isLanguageSelected: storage.getBoolean('isLanguageSelected') ?? false,
      isLogin: storage.getBoolean('isLogin') ?? false,
    });

    if (!storedUser) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(storedUser) as {user: User; token: string});
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{appState, setAppState, authFlowType, setAuthFlow, user, setUser}}>
      {children}
    </AppContext.Provider>
  );
};
