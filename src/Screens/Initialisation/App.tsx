/* eslint-disable react/react-in-jsx-scope */
// App.tsx
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '../Navigation/RootNavigator';
import {AppProvider} from '../Navigation/AppContext';
// import { useEffect } from 'react';
// import { storage } from '../Navigation/Storage';

export default function App() {
  // useEffect(() => {
  //   storage.clearAll();
  // }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
