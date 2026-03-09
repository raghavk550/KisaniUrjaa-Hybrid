/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useContext, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {storage} from '../Navigation/Storage';
import {AppContext} from '../Navigation/AppContext';
import {RootStackParamList} from '../Navigation/RootNavigator';

type VerifiedOtpRouteProp = RouteProp<RootStackParamList, 'VerifiedOtp'>;

const VerifiedOTPView = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {setAppState} = context;
  const navigation = useNavigation();
  const route = useRoute<VerifiedOtpRouteProp>();
  const isLogin = route.params?.isLogin ?? false;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLogin) {
        setAppState(prev => ({
          ...prev,
          isSignUp: true,
        }));
        storage.set('isSignUp', true);
        navigation.navigate('CreateAccount' as never);
      } else {
        setAppState(prev => ({
          ...prev,
          isLogin: true,
        }));
        storage.set('isLogin', true);
        navigation.navigate('Home' as never);
      }
    }, 2000); // 2 sec splash
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/VerifiedOTP/bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.centerView}>
        <Image
          source={require('../../Assets/Images/VerifiedOTP/logo.png')}
          style={{marginTop: 24}}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            marginTop: 16,
            marginBottom: 24,
            marginHorizontal: 10,
            color: '#161413',
          }}>
          Verified Successfully
        </Text>
      </View>
    </View>
  );
};

export default VerifiedOTPView;

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
