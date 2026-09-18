import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Defs, ClipPath, Line } from 'react-native-svg';
import { colors } from '../theme/colors';
import { bulb } from '../data/lightingData';

const W = 170;
const GLASS_TOP = 8;
const NECK_Y = 210;
const BASE_BOTTOM = 288;

const BULB_PATH = `
  M85,${GLASS_TOP}
  C40,${GLASS_TOP} 16,64 16,116
  C16,160 40,196 63,210
  L63,${NECK_Y}
  L107,${NECK_Y}
  L107,210
  C130,196 154,160 154,116
  C154,64 130,${GLASS_TOP} 85,${GLASS_TOP}
  Z
`;

const splitY = GLASS_TOP + (bulb.normal.pct / 100) * (NECK_Y - GLASS_TOP);

export function LightBulb() {
  return (
    <View style={styles.wrap}>
      <Svg width={W} height={BASE_BOTTOM + 6} viewBox={`0 0 ${W} ${BASE_BOTTOM + 6}`}>
        <Defs>
          <ClipPath id="bulbClip">
            <Path d={BULB_PATH} />
          </ClipPath>
        </Defs>
        <Path d={BULB_PATH} fill={colors.surfaceAlt} />
        <ClippedFills />
        <Path d={BULB_PATH} stroke={colors.borderStrong} strokeWidth={2} fill="none" />
        <Line x1={63} y1={NECK_Y} x2={107} y2={NECK_Y} stroke={colors.borderStrong} strokeWidth={1.5} />

        {/* metallic screw base */}
        {Array.from({ length: 7 }).map((_, i) => {
          const y = NECK_Y + 4 + i * 10;
          const inset = i % 2 === 0 ? 4 : 0;
          return (
            <Rect
              key={i}
              x={63 + inset}
              y={y}
              width={44 - inset * 2}
              height={8}
              fill={i % 2 === 0 ? '#B7BDC4' : '#9AA1A8'}
            />
          );
        })}
        <Rect x={68} y={NECK_Y + 74} width={34} height={14} rx={4} fill="#8A9098" />
      </Svg>

      <View style={[styles.labelOverlay, { top: GLASS_TOP + 26 }]}>
        <Text style={[styles.pct, { color: '#1F9D55' }]}>{bulb.normal.pct}%</Text>
        <Text style={styles.caption}>NORMAL LIGHTING</Text>
      </View>
      <View style={[styles.labelOverlay, { top: splitY + 22 }]}>
        <Text style={[styles.pct, { color: '#2255A4' }]}>{bulb.emergency.pct}%</Text>
        <Text style={styles.caption}>EMERGENCY LIGHTING</Text>
      </View>
    </View>
  );
}

function ClippedFills() {
  return (
    <>
      <Rect x={0} y={GLASS_TOP} width={W} height={splitY - GLASS_TOP} fill="#DCF3E3" clipPath="url(#bulbClip)" />
      <Rect x={0} y={splitY} width={W} height={NECK_Y - splitY} fill="#DCE9F7" clipPath="url(#bulbClip)" />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    position: 'relative',
  },
  labelOverlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  pct: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
  },
  caption: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#3A4A50',
    letterSpacing: 0.3,
  },
});
