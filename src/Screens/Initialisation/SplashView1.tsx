/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
// SplashView1.tsx
import {useContext, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {AppContext} from '../Navigation/AppContext';

const SplashView1 = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const {setAppState} = context;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        isSplash1Done: true,
      }));
    }, 2000); // 2 sec splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mainView}>
      <Image
        source={require('../../Assets/Images/Splash1.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});

export default SplashView1;
