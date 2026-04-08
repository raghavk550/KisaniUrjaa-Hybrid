import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const BottomTabBar1 = ({state, navigation}: any) => {
  const activeRouteName = state.routes[state.index]?.name;
  const isHomeActive = activeRouteName === 'HomeTab';
  const isAccountActive = activeRouteName === 'AccountTab';

  return (
    <View style={styles.container}>
      <View style={styles.curveGroup}>
        <View style={styles.curveSideLeft} />
        <View style={styles.centerCurve} />
        <View style={styles.curveSideRight} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('HomeTab')}>
          <Image source={require('../../Assets/Images/Tabs/home.png')} />
          <Text
            style={isHomeActive ? styles.activeLabel : styles.inactiveLabel}>
            Home
          </Text>
        </TouchableOpacity>

        <View style={styles.centerSpacer} />

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('AccountTab')}>
          <Image source={require('../../Assets/Images/Tabs/account.png')} />
          <Text
            style={isAccountActive ? styles.activeLabel : styles.inactiveLabel}>
            Account
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => console.log('Add')}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabBar1;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    overflow: 'visible',
  },
  curveGroup: {
    position: 'absolute',
    top: -36,
    width: 146,
    height: 82,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  centerCurve: {
    position: 'absolute',
    top: 0,
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFFFFF',
  },
  curveSideLeft: {
    position: 'absolute',
    top: 38,
    left: 12,
    width: 34,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 22,
  },
  curveSideRight: {
    position: 'absolute',
    top: 38,
    right: 12,
    width: 34,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 22,
  },
  tabBar: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    zIndex: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },
  centerSpacer: {
    width: 102,
  },
  fab: {
    position: 'absolute',
    top: -30,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#FC8019',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  activeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FC8019',
  },
  inactiveLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#625D5B',
  },
});
