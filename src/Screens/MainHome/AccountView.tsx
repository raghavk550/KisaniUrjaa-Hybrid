/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AccountView = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ACD2D6', '#AEE5BE']}
        locations={[0, 1]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          alignSelf: 'stretch',
          height: 200,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#161413',
          marginTop: 66,
        }}>
        Account
      </Text>
    </View>
  );
};

export default AccountView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
