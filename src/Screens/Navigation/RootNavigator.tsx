/* eslint-disable react/react-in-jsx-scope */
// RootNavigator.tsx
import {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashView1 from '../Initialisation/SplashView1';
import SplashView2 from '../Initialisation/SplashView2';
import ChooseLanguageView from '../Initialisation/ChooseLanguageView';
import {AppContext} from './AppContext';
import SignUpView from '../Auth/SignUp';
import LoginView from '../Auth/LoginView';
import OTPView from '../Auth/OTPView';
import VerifiedOtpView from '../Auth/VerifiedOTPView';
import CreateAccountView from '../Auth/CreateAccount/CreateUserIDView';
import CreatePasswordView from '../Auth/CreateAccount/CreatePasswordView';
import VerifiedPasswordView from '../Auth/CreateAccount/VerifiedPasswordView';
import ForgotPasswordView from '../Auth/ForgotPasswordView';
import VerifiedForgotPassOTPView from '../Auth/VerifiedForgotPassOTPView';
import ResetPasswordView from '../Auth/ResetPasswordView';
import ResetPasswordUpdatedView from '../Auth/ResetPasswrodUpdatedView';
import ResetUserIdView from '../Auth/ResetUserIdView';

export type RootStackParamList = {
  Splash1: undefined;
  Splash2: undefined;
  ChooseLanguage: undefined;

  SignUp: undefined;
  Login: undefined;

  Otp: {isForgotPassword?: boolean};
  VerifiedOtp: undefined;

  CreateAccount: undefined;
  CreatePassword: undefined;
  VerifiedPassword: undefined;

  ForgotPassword: undefined;
  VerifiedForgotPassOTP: {isForgotPassword?: boolean};
  ResetPassword: undefined;
  ResetPasswordUpdated: undefined;
  ResetUserId: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const {appState} = context;

  if (!appState.isSplash1Done) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash1" component={SplashView1} />
      </Stack.Navigator>
    );
  }

  if (!appState.isSplash2Done) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash2" component={SplashView2} />
      </Stack.Navigator>
    );
  }

  if (!appState.isLanguageSelected) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguageView} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Otp" component={OTPView} />
      <Stack.Screen name="VerifiedOtp" component={VerifiedOtpView} />
      <Stack.Screen name="CreateAccount" component={CreateAccountView} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordView} />
      <Stack.Screen name="VerifiedPassword" component={VerifiedPasswordView} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} />
      <Stack.Screen
        name="VerifiedForgotPassOTP"
        component={VerifiedForgotPassOTPView}
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
      <Stack.Screen
        name="ResetPasswordUpdated"
        component={ResetPasswordUpdatedView}
      />
      <Stack.Screen name="ResetUserId" component={ResetUserIdView} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
