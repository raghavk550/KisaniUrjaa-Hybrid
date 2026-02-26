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
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [appState, setAppState] = useState<AppState>({
    isSplash1Done: false,
    isSplash2Done: false,
    isLanguageSelected: false,
  });

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      {children}
    </AppContext.Provider>
  );
};
