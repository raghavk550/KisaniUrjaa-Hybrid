/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CreatePasswordView = () => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [confirmSecurePass, setConfirmSecurePass] = useState(true);
  const eyeIcon = require('../../../Assets/Images/ic-eye.png');
  const eyeOffIcon = require('../../../Assets/Images/ic-eye-off.png');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../Assets/Images/SplashTransparentBg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        style={styles.backButton}>
        <Image
          source={require('../../../Assets/Images/backArrow.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Image
          source={require('../../../Assets/Images/Logo.png')}
          style={{alignSelf: 'center', marginTop: 24}}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            marginTop: 28,
            marginHorizontal: 20,
            color: '#161413',
          }}>
          Create Password
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            marginTop: 12,
            marginHorizontal: 20,
            color: '#6C7278',
          }}>
          This User ID and password will be used to login to the your account
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            color: '#353231',
            marginTop: 24,
            paddingHorizontal: 20,
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
            source={require('../../../Assets/Images/ic-password.png')}
            style={{marginLeft: 16}}
            resizeMode="cover"
          />
          <TextInput
            placeholder="Create Password"
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
        <Text
          style={{
            fontWeight: '500',
            fontSize: 12,
            color: '#6C7278',
            marginTop: 6,
            paddingHorizontal: 20,
          }}>
          Password must be 8–20 characters with at least 1 letter and 1 number.
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            color: '#353231',
            marginTop: 24,
            paddingHorizontal: 20,
          }}>
          Confirm Password
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
            source={require('../../../Assets/Images/ic-password.png')}
            style={{marginLeft: 16}}
            resizeMode="cover"
          />
          <TextInput
            placeholder="Re-enter Password"
            style={{
              flex: 1,
              color: '#161413',
              fontSize: 16,
              marginHorizontal: 12,
              fontWeight: '500',
            }}
            value={confirmPass}
            onChangeText={setConfirmPass}
            cursorColor={'#161413'}
            secureTextEntry={confirmSecurePass}
          />
          <TouchableOpacity
            onPress={() => setConfirmSecurePass(!confirmSecurePass)}>
            <Image
              source={confirmSecurePass ? eyeOffIcon : eyeIcon}
              style={{marginRight: 16}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VerifiedPassword' as never);
          }}
          style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePasswordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {top: 60, left: 16, position: 'absolute'},
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
  continueButton: {
    width: '90%',
    height: 56,
    backgroundColor: '#FC8019',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
    alignSelf: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
