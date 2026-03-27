/* eslint-disable react-native/no-inline-styles */
// App.tsx
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '../Navigation/RootNavigator';
import {AppProvider} from '../Navigation/AppContext';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';
import {userStore} from '../../Helper/Redux/User/UserStore';
import Toast from 'react-native-toast-message';
// import { useEffect } from 'react';
// import { storage } from '../Navigation/Storage';

export default function App() {
  // useEffect(() => {
  //   storage.clearAll();
  // }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={userStore}>
        <AppProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <Toast />
          </BottomSheetModalProvider>
        </AppProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
