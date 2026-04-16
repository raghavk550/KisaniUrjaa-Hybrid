/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
// RootNavigator.tsx
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashView1 from '../Initialisation/SplashView1';
import SplashView2 from '../Initialisation/SplashView2';
import ChooseLanguageView from '../Initialisation/ChooseLanguageView';
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
import HomeView from '../Home/Home';
import {useContext} from 'react';
import {AppContext} from './AppContext';
import {ApiResult, User} from '../../Helper/ApiService/LoginApi';
import {storage} from './Storage';
import MainHomeView from '../MainHome/MainHomeView';
import AccountView from '../MainHome/AccountView';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '../MainHome/BottomTabBar';
import AllNewsView from '../MainHome/Views/AllNews';
import NewsDetailsView from '../MainHome/Views/NewsDetails';
import NewsWebView from '../MainHome/Views/NewsWebView';

export type RootStackParamList = {
  Splash1: undefined;
  Splash2: undefined;
  ChooseLanguage: undefined;

  SignUp: undefined;
  Login: undefined;

  Otp: {isLogin?: boolean; isForgotPassword?: boolean; apiResult?: ApiResult};
  VerifiedOtp: {isLogin?: boolean};

  CreateAccount: undefined;
  CreatePassword: undefined;
  VerifiedPassword: undefined;

  ForgotPassword: undefined;
  VerifiedForgotPassOTP: {isForgotPassword?: boolean};
  ResetPassword: undefined;
  ResetPasswordUpdated: undefined;
  ResetUserId: undefined;
  Home: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  AccountTab: undefined;
  AllNews: undefined;
  NewsDetails: {newsId: string};
  NewsWebView: {url: string; title?: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="HomeTab" component={MainHomeView} />
      <Tab.Screen name="AccountTab" component={AccountView} />
      <Tab.Screen name="AllNews" component={AllNewsView} />
      <Tab.Screen name="NewsDetails" component={NewsDetailsView} />
      <Tab.Screen name="NewsWebView" component={NewsWebView} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const {appState} = context;
  const {user} = context;
  let hasCreatedUserId = user?.user?.isUserIdCreated ?? false;

  // 🔥 Onboarding Flow
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

  // 🔥 Auth / Main Flow
  const storedUser = storage.getString('user');

  let parsedUser: {user: User; token: string} | null = null;
  if (storedUser) {
    parsedUser = JSON.parse(storedUser);
    hasCreatedUserId = parsedUser?.user?.isUserIdCreated ?? false;
  }
  return (
    <Stack.Navigator
      key={`${appState.isLogin ? 'logged-in' : 'logged-out'}-${
        hasCreatedUserId ? 'user-id-created' : 'user-id-pending'
      }`}
      initialRouteName={
        !appState.isLogin
          ? 'SignUp'
          : !user
          ? 'SignUp'
          : hasCreatedUserId
          ? 'Home'
          : 'CreateAccount'
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="CreateAccount" component={CreateAccountView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Otp" component={OTPView} />
      <Stack.Screen name="VerifiedOtp" component={VerifiedOtpView} />
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
