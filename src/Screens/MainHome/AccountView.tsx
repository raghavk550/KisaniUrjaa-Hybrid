/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const AccountView = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'red',
          height: 100,
          width: 100,
          borderTopLeftRadius: 26,
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          height: 100,
          width: 100,
          marginTop: -180,
          marginRight: 160,
          borderBottomRightRadius: 26,
          borderEndColor: 'black',
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          height: 100,
          width: 100,
          marginTop: -100,
          marginRight: -160,
          borderBottomLeftRadius: 26,
          borderEndColor: 'black',
        }}
      />

      <Svg width="100%" height={80} style={{position: 'absolute', top: 40}}>
        <Path
          d="
      M0 40
      Q50 40 60 0
      Q75 -20 90 0
      Q100 40 150 40
      L150 80
      L0 80
      Z
    "
          fill="green"
        />
      </Svg>
    </View>
  );
};

export default AccountView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
