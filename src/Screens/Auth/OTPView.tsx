/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '../Navigation/RootNavigator';

const OTP_LENGTH = 6;

type OTPRouteProp = RouteProp<RootStackParamList, 'Otp'>;

const OTPView = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<TextInput[]>([]);
  const [cardWidth, setCardWidth] = useState(0);
  const route = useRoute<OTPRouteProp>();
  const isForgotPassword = route.params?.isForgotPassword ?? false;

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    } else if (text && index === OTP_LENGTH - 1) {
      inputs.current[index]?.blur();
    }
    // console.log('OTP Entered:', newOtp.join(''));
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        style={styles.backButton}>
        <Image
          source={require('../../Assets/Images/backArrow.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View
        style={styles.centerView}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setCardWidth(width);
        }}>
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
            color: '#161413',
          }}>
          OTP Verification
        </Text>
        <View
          style={{flexDirection: 'row', marginTop: 12, marginHorizontal: 20}}>
          <Text style={{color: '#6C7278'}}>OTP sent to</Text>
          <Text style={{color: '#4D5256'}}>+91 xxxxxx3210</Text>
        </View>
        <View style={{width: '100%', paddingHorizontal: 20, marginTop: 40}}>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                placeholder="X"
                key={index}
                ref={ref => (inputs.current[index] = ref!)}
                style={[
                  styles.box,
                  {width: (cardWidth - 12) / OTP_LENGTH - 12},
                ]}
                value={digit}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
              />
            ))}
          </View>
          <View
            style={{
              marginTop: 10,
              alignSelf: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {timeLeft > 0 ? (
              <>
                <Text style={{color: '#625D5B', fontWeight: '500'}}>
                  Resend OTP in
                </Text>
                <Image
                  source={require('../../Assets/Images/timer.png')}
                  style={{marginLeft: 8, marginRight: 1}}
                  resizeMode="cover"
                />
                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
              </>
            ) : (
              <>
                <Text
                  style={{color: '#625D5B', fontWeight: '500', fontSize: 14}}>
                  Didn’t get the code?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTimeLeft(60); // Reset timer on resend
                  }}
                  style={{marginLeft: 8}}>
                  <Text
                    style={{color: '#FC8019', fontWeight: '600', fontSize: 14}}>
                    Resend
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            isForgotPassword
              ? navigation.navigate('VerifiedForgotPassOTP' as never)
              : navigation.navigate('VerifiedOtp' as never);
          }}
          style={styles.verifyButton}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
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
  backButton: {top: 60, left: 16, position: 'absolute'},
  centerView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  verifyButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#FC8019',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 64,
    marginBottom: 24,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A9B0C',
  },
  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    height: 56,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 16,
    borderColor: '#E3E2E1',
    borderWidth: 1,
    color: '#161413',
    fontWeight: '500',
  },
});

export default OTPView;
