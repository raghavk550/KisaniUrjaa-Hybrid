/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const VerifiedOTPView = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('CreateAccount' as never);
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
