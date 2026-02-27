/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../Navigation/AppContext';

const ResetPasswordUpdatedView = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {authFlowType} = context;
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login' as never}],
      });
    }, 2000); // 2 sec splash
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.centerView}>
        <Image
          source={require('../../Assets/Images/VerifiedOTP/tick.png')}
          style={{marginTop: 24}}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            marginTop: 28,
            marginBottom: 16,
            marginHorizontal: 10,
            color: '#161413',
          }}>
          {authFlowType === 'forgotPassword' ? 'Password' : 'User ID'} Updated
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            marginBottom: 24,
            marginHorizontal: 10,
            color: '#6C7278',
          }}>
          Your {authFlowType === 'forgotPassword' ? 'password' : 'user id'} has
          been successfully updated.
        </Text>
      </View>
    </View>
  );
};

export default ResetPasswordUpdatedView;

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
    alignItems: 'center',
  },
});
