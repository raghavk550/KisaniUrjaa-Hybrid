/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ResetPasswordView = () => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [confirmSecurePass, setConfirmSecurePass] = useState(true);
  const eyeIcon = require('../../Assets/Images/ic-eye.png');
  const eyeOffIcon = require('../../Assets/Images/ic-eye-off.png');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login' as never}],
          });
        }}
        style={styles.backButton}>
        <Image
          source={require('../../Assets/Images/backCross.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            marginTop: 24,
            marginHorizontal: 20,
            color: '#161413',
          }}>
          Reset Password
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginTop: 12,
            marginHorizontal: 20,
            color: '#6C7278',
          }}>
          Enter a new password
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            color: '#353231',
            marginTop: 24,
            paddingHorizontal: 20,
          }}>
          New Password
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
            source={require('../../Assets/Images/ic-password.png')}
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
            source={require('../../Assets/Images/ic-password.png')}
            style={{marginLeft: 16}}
            resizeMode="cover"
          />
          <TextInput
            placeholder="Confirm Password"
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
            // navigation.navigate('VerifiedPassword' as never);
          }}
          style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordView;

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
  backButton: {top: 60, right: 16, position: 'absolute'},
  centerView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  submitButton: {
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
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
