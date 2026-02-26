/* eslint-disable react/react-in-jsx-scope */
// App.tsx
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '../Navigation/RootNavigator';
import {AppProvider} from '../Navigation/AppContext';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
