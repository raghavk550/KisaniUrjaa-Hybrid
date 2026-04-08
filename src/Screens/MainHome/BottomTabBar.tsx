import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

// ─── Layout constants ────────────────────────────────────────────────────────
const SCREEN_W = Dimensions.get('window').width;
const TAB_H = 75; // visible tab bar height
const CR = 6; // top corner radius of the bar
const NR = 26; // center dome radius
const FAB_R = 32; // FAB circle radius
const FAB_RING = 10;
const DOME_R = 28; // raised center arc radius
const DOME_HALF_WIDTH = 82; // half-width from center to where the dome blends into the bar
const SHOULDER_FLAT = 26; // keeps bar top flat before the curve rises
const SHOULDER_DROP = 26; // keeps tangent vertical at the arc join

// ─── SVG dimensions ──────────────────────────────────────────────────────────
//  y = NR is the top edge of the bar.
//  The center dome is composed of:
//  1) a left cubic shoulder with horizontal tangent at bar-top
//  2) a circular arc through the raised middle
//  3) a mirrored right cubic shoulder
//
//  The cubic control points are arranged so the shoulders end with a vertical
//  tangent, which matches the circle at its left/right-most points. This makes
//  the join visually smooth like a Figma vector curve.
const W = SCREEN_W;
const SVG_H = NR + TAB_H;

const buildPath = () => {
  const mid = W / 2;

  const barY = NR;
  const topY = barY - DOME_R;
  const leftStartX = mid - DOME_HALF_WIDTH;
  const rightEndX = mid + DOME_HALF_WIDTH;
  const arcLeftX = mid - DOME_R;
  const arcRightX = mid + DOME_R;

  return `
    M 0 ${SVG_H}
    L 0 ${barY + CR}
    Q 0 ${barY} ${CR} ${barY}

    L ${leftStartX} ${barY}

    C ${leftStartX + SHOULDER_FLAT} ${barY}
      ${arcLeftX} ${topY + SHOULDER_DROP}
      ${arcLeftX} ${topY}

    A ${DOME_R} ${DOME_R} 0 0 1 ${arcRightX} ${topY}

    C ${arcRightX} ${topY + SHOULDER_DROP}
      ${rightEndX - SHOULDER_FLAT} ${barY}
      ${rightEndX} ${barY}

    L ${W - CR} ${barY}
    Q ${W} ${barY} ${W} ${barY + CR}

    L ${W} ${SVG_H}
    Z
  `;
};

const tabPath = buildPath();

const BottomTabBar = ({state, navigation}: any) => {
  const activeRouteName = state.routes[state.index].name;
  const isHomeActive = activeRouteName === 'HomeTab';
  const isAccountActive = activeRouteName === 'AccountTab';

  // FAB centre sits inside the raised middle curve.
  const fabTop = NR - FAB_R;

  return (
    <View style={styles.container}>
      {/* ── SVG background with smooth notch ─────────────────────────── */}
      <Svg width={SCREEN_W} height={SVG_H} style={styles.svg}>
        <Path d={tabPath} fill="#FFFFFF" />
      </Svg>

      {/* ── Tab items ────────────────────────────────────────────────── */}
      <View style={styles.tabRow} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('HomeTab')}>
          <Image source={require('../../Assets/Images/Tabs/home.png')} />
          <Text
            style={isHomeActive ? styles.activeLabel : styles.inactiveLabel}>
            Home
          </Text>
        </TouchableOpacity>

        {/* centre spacer — spans the full notch+fillet width */}
        <View style={{width: DOME_HALF_WIDTH * 2}} />

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

      <View
        pointerEvents="none"
        style={[
          styles.fabRing,
          {
            top: fabTop - FAB_RING / 2,
            width: FAB_R * 2 + FAB_RING,
            height: FAB_R * 2 + FAB_RING,
            borderRadius: FAB_R + FAB_RING / 2,
          },
        ]}
      />

      {/* ── FAB ──────────────────────────────────────────────────────── */}
      <TouchableOpacity style={[styles.fab, {top: fabTop}]}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SVG_H, // extends NR above the visible bar so the arch is not clipped
    overflow: 'visible',
  },

  svg: {
    position: 'absolute',
    bottom: 0,
    // subtle drop-shadow via elevation / shadow props on the container
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -3},
    shadowRadius: 8,
    elevation: 10,
  },

  tabRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_H,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  tabItem: {
    alignItems: 'center',
  },

  activeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FC8019',
  },

  inactiveLabel: {
    fontSize: 12,
    color: '#625D5B',
  },

  fabRing: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 8,
  },

  fab: {
    position: 'absolute',
    alignSelf: 'center',
    width: FAB_R * 2,
    height: FAB_R * 2,
    borderRadius: FAB_R,
    backgroundColor: '#FC8019',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
  },

  fabText: {
    fontSize: 28,
    color: '#fff',
  },
});
