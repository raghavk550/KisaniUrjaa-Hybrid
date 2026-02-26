/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {AppContext} from '../Navigation/AppContext';

const SplashView2 = () => {
  const BUTTON_WIDTH = Dimensions.get('window').width * 0.85;
  const Arrow_SIZE = 40;
  const MAX_TRANSLATE = BUTTON_WIDTH - Arrow_SIZE - 20;
  const translateX = useRef(new Animated.Value(0)).current;
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const {setAppState} = context;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx <= MAX_TRANSLATE) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= MAX_TRANSLATE * 0.9) {
          Animated.timing(translateX, {
            toValue: MAX_TRANSLATE,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            setAppState(prev => ({
              ...prev,
              isSplash2Done: true,
            }));
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.mainView}>
      <Video
        source={require('../../Assets/Videos/Splash2.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
      />

      <View style={styles.backgroundView}>
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(172,172,172,0)']}
          locations={[0, 0.98]}
          style={styles.gradient}
        />
        <Image
          source={require('../../Assets/Images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.bottomContainer}>
          {/* Button */}
          <View style={styles.button}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.arrowContainer,
                {
                  transform: [{translateX}],
                },
              ]}>
              <Text style={styles.arrow}>→</Text>
            </Animated.View>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  backgroundView: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
  },
  arrow: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FC8019',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    width: '85%',
    height: 60,
    backgroundColor: '#6B705C',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
});

export default SplashView2;
