/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation();
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
          onPress={() => {
            navigation.navigate('Otp' as never);
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
