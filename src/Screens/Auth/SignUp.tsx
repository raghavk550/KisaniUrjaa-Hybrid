/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/RootNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Helper/Redux/User/UserStore';
import {getOTP, logout} from '../../Helper/Redux/Auth/AuthSlice';
import Toast from 'react-native-toast-message';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(logout());
    if (!isFocused) {
      return;
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.centerView}>
        <Image
          source={require('../../Assets/Images/Logo.png')}
          style={{alignSelf: 'center', marginTop: 24}}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            marginTop: 28,
            marginLeft: 20,
          }}>
          Set up account
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            marginTop: 12,
            marginHorizontal: 20,
            color: '#6C7278',
          }}>
          Enter your mobile number and We’ll send you a one-time verification
          code.
        </Text>
        <View style={styles.mobileNumView}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
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
        <TouchableOpacity
          onPress={async () => {
            if (text.length !== 10) {
              Toast.show({
                type: 'error',
                text1: 'Invalid Mobile Number',
                text2: 'Please enter a valid 10-digit mobile number.',
                position: 'bottom',
              });
              return;
            }
            await dispatch(logout());
            try {
              const data = await dispatch(getOTP(text)).unwrap();
              Toast.show({
                type: 'success',
                text1: data.user.otp ?? 'OTP Sent',
                position: 'bottom',
              });
              navigation.navigate('Otp', {isLogin: false, apiResult: data});
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: String(error),
                position: 'bottom',
              });
            }
          }}
          style={styles.otpButton}>
          <Text style={styles.otpText}>Get OTP</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 22,
          }}>
          <Text style={{color: '#625D5B', fontWeight: '500'}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Login' as never}],
              });
            }}>
            <Text style={{color: '#FC8019', fontWeight: '700', marginLeft: 5}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
        }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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

export default SignUp;
