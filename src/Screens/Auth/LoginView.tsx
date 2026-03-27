/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../Navigation/AppContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/RootNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Helper/Redux/User/UserStore';
import {getOTP, loginUser} from '../../Helper/Redux/Auth/AuthSlice';
import Toast from 'react-native-toast-message';

type LoginType = 'otp' | 'userId';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginView = () => {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [pass, setPass] = useState('');
  const [loginType, setLoginType] = useState<LoginType>('otp');
  const navigation = useNavigation<NavigationProp>();
  const eyeIcon = require('../../Assets/Images/ic-eye.png');
  const eyeOffIcon = require('../../Assets/Images/ic-eye-off.png');
  const [securePass, setSecurePass] = useState(true);
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {setAuthFlow} = context;
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.auth);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.centerView}>
        <Image
          source={require('../../Assets/Images/Logo.png')}
          style={{alignSelf: 'center', marginTop: 24}}
          resizeMode="cover"
        />
        <View
          style={{
            height: 40,
            marginTop: 28,
            marginHorizontal: 20,
            backgroundColor: '#76768012',
            borderRadius: 8,
            flexDirection: 'row',
            padding: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              setLoginType('otp');
            }}
            style={{
              backgroundColor: loginType === 'otp' ? '#FFFFFF' : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              alignSelf: 'stretch',
              flex: 1,
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 13,
                color: '#000',
              }}>
              With OTP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLoginType('userId');
            }}
            style={{
              flex: 1,
              backgroundColor:
                loginType === 'userId' ? '#FFFFFF' : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              alignSelf: 'stretch',
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 13,
                color: '#000',
              }}>
              User ID & Password
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            marginTop: 28,
            marginHorizontal: 20,
            color: '#6C7278',
          }}>
          {loginType === 'otp'
            ? 'Enter your registered mobile number'
            : 'Login with User ID & Password'}
        </Text>
        {loginType === 'otp' ? (
          <>
            <View style={styles.mobileNumView}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#353231',
                }}>
                Mobile Number
              </Text>
              <Image
                source={require('../../Assets/Images/required.png')}
                style={{marginLeft: 2, marginTop: 2}}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                height: 56,
                borderColor: '#E3E2E1',
                borderWidth: 1,
                borderRadius: 12,
                width: '90%',
                alignSelf: 'center',
                marginTop: 6,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#857E7B', marginLeft: 16}}>+91</Text>
              <Image
                source={require('../../Assets/Images/mobSep.png')}
                style={{marginHorizontal: 12}}
                resizeMode="cover"
              />
              <TextInput
                placeholder="Enter Mobile Number"
                style={{
                  flex: 1,
                  color: '#161413',
                  fontSize: 16,
                  marginRight: 16,
                }}
                value={text}
                onChangeText={setText}
                keyboardType="number-pad"
                maxLength={10}
                cursorColor={'#161413'}
              />
            </View>
          </>
        ) : (
          <>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                marginTop: 24,
                marginHorizontal: 20,
                color: '#353231',
              }}>
              User ID
            </Text>
            <View
              style={{
                height: 56,
                borderColor: '#E3E2E1',
                borderWidth: 1,
                borderRadius: 12,
                width: '90%',
                alignSelf: 'center',
                marginTop: 6,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../Assets/Images/ic-user.png')}
                style={{marginLeft: 16}}
                resizeMode="cover"
              />
              <TextInput
                placeholder="Enter User ID"
                style={{
                  flex: 1,
                  color: '#161413',
                  fontSize: 16,
                  marginHorizontal: 12,
                  fontWeight: '500',
                }}
                value={userId}
                onChangeText={setUserId}
                cursorColor={'#161413'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setAuthFlow('forgotUserId');
                navigation.navigate('ForgotPassword' as never);
              }}
              style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 6}}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FC8019'}}>
                Forgot User ID?
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                marginTop: 24,
                marginHorizontal: 20,
                color: '#353231',
              }}>
              Password
            </Text>
            <View
              style={{
                height: 56,
                borderColor: '#E3E2E1',
                borderWidth: 1,
                borderRadius: 12,
                width: '90%',
                alignSelf: 'center',
                marginTop: 6,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../Assets/Images/ic-user.png')}
                style={{marginLeft: 16}}
                resizeMode="cover"
              />
              <TextInput
                placeholder="Enter Password"
                style={{
                  flex: 1,
                  color: '#161413',
                  fontSize: 16,
                  marginHorizontal: 12,
                  fontWeight: '500',
                }}
                value={pass}
                onChangeText={setPass}
                cursorColor={'#161413'}
                secureTextEntry={securePass}
              />
              <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
                <Image
                  source={securePass ? eyeOffIcon : eyeIcon}
                  style={{marginRight: 16}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setAuthFlow('forgotPassword');
                navigation.navigate('ForgotPassword' as never);
              }}
              style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 6}}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FC8019'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={async () => {
            try {
              if (loginType === 'otp') {
                await dispatch(loginUser(text)).unwrap();
                const data = await dispatch(getOTP(text)).unwrap();
                Toast.show({
                  type: 'success',
                  text1: data.user.otp ?? 'OTP Sent',
                  position: 'bottom',
                });
                navigation.navigate('Otp', {isLogin: true, apiResult: data});
              } else {
                // TODO: - Implement User ID & Password login flow
              }
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: String(error),
                position: 'bottom',
              });
            }
          }}
          style={styles.otpButton}>
          <Text style={styles.otpText}>
            {loginType === 'otp' ? 'Get OTP' : 'Continue'}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 22,
          }}>
          <Text style={{color: '#625D5B', fontWeight: '400', fontSize: 14}}>
            Don’t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'SignUp' as never}],
              });
            }}>
            <Text style={{color: '#FC8019', fontWeight: '700', marginLeft: 5}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View
          style={{
            backgroundColor: '#00000030',
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            zIndex: 999,
          }}>
          <ActivityIndicator size="large" color="#FC8019" />
        </View>
      )}
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  centerView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mobileNumView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    marginHorizontal: 20,
  },
  otpButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#FC8019',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
  },
  otpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
