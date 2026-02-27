/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../Navigation/AppContext';

type LoginType = 'otp' | 'userId';

const LoginView = () => {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [pass, setPass] = useState('');
  const [loginType, setLoginType] = useState<LoginType>('otp');
  const navigation = useNavigation();
  const eyeIcon = require('../../Assets/Images/ic-eye.png');
  const eyeOffIcon = require('../../Assets/Images/ic-eye-off.png');
  const [securePass, setSecurePass] = useState(true);
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {setAuthFlow} = context;
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
          onPress={() => {
            navigation.navigate('Otp' as never);
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
