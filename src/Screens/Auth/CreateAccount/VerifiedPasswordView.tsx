/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const VerifiedPasswordView = () => {
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
        source={require('../../../Assets/Images/VerifiedOTP/bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.centerView}>
        <Image
          source={require('../../../Assets/Images/VerifiedPass/logo.png')}
          style={{marginTop: 24}}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            marginVertical: 28,
            marginHorizontal: 28,
            color: '#161413',
          }}>
          Thanks for joining us!
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            marginHorizontal: 28,
            color: '#353231',
            marginBottom: 24,
            textAlign: 'center',
          }}>
          Your account is ready. Complete your profile to get started.
        </Text>
      </View>
    </View>
  );
};

export default VerifiedPasswordView;

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
