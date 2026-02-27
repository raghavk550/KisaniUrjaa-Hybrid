/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../Navigation/RootNavigator';
import {AppContext} from '../Navigation/AppContext';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordView = () => {
  const navigation = useNavigation<NavigationProp>();
  const [text, setText] = useState('');
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {authFlowType} = context;
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.bgImage}
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
      <View style={styles.centerView}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginTop: 24,
            marginHorizontal: 20,
          }}>
          {authFlowType === 'forgotPassword' ? 'Forgot Password' : 'Forgot User ID'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginTop: 12,
            marginHorizontal: 20,
            color: '#6C7278',
          }}>
          Enter your registered mobile number, we will send an OTP
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            color: '#353231',
            marginTop: 24,
            marginHorizontal: 20,
          }}>
          Mobile Number
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
            navigation.navigate('Otp', {isForgotPassword: true});
          }}
          style={styles.otpButton}>
          <Text style={styles.otpText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {top: 60, left: 16, position: 'absolute'},
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
  otpButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#FC8019',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  otpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
