/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const CreateAccountView = () => {
  const [text, setText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../Assets/Images/SplashTransparentBg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
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
          Create User ID
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
        <View
          style={{
            width: '100%',
            marginTop: 24,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: '#353231',
            }}>
            User ID
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowTooltip(prev => !prev);
            }}>
            <Image
              source={require('../../../Assets/Images/info.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {showTooltip && (
            <View style={styles.wrapper}>
              <View style={styles.bubble}>
                <Text style={styles.text}>
                  User ID creation is restricted to English only
                </Text>
              </View>

              {/* Triangle Pointer */}
              <View style={styles.arrow} />
            </View>
          )}
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
          <Image
            source={require('../../../Assets/Images/ic-user.png')}
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
            value={text}
            onChangeText={setText}
            cursorColor={'#161413'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreatePassword' as never);
          }}
          style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccountView;

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
  wrapper: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: -34,
    right: 7,
  },
  bubble: {
    backgroundColor: '#212121',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#212121',
    marginRight: 14, // move arrow horizontally
  },
});
