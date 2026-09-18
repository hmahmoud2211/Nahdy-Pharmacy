import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  pct: number;
  color?: string;
  trackColor?: string;
  width?: number;
  label?: string;
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const largeArc = startDeg - endDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// Semicircular gauge (0-100%), matching the MDB "Total Active Load" / UPS "Load" gauges.
export function Gauge({ pct, color = colors.gaugeTeal, trackColor = colors.gaugeTrack, width = 130, label }: Props) {
  const height = width * 0.58;
  const cx = width / 2;
  const cy = height - 5;
  const r = width / 2 - 9;
  const stroke = 10;
  const clamped = Math.max(0, Math.min(100, pct));
  const progressEnd = 180 - clamped * 1.8;

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width, height }}>
        <Svg width={width} height={height}>
          <Path d={arcPath(cx, cy, r, 180, 0)} stroke={trackColor} strokeWidth={stroke} strokeLinecap="round" fill="none" />
          {clamped > 0 && (
            <Path d={arcPath(cx, cy, r, 180, progressEnd)} stroke={color} strokeWidth={stroke} strokeLinecap="round" fill="none" />
          )}
        </Svg>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 2, alignItems: 'center' }}>
          <Text style={[typography.metricLarge, { fontSize: width * 0.19, color: colors.textPrimary }]}>{clamped}%</Text>
          {label ? <Text style={typography.caption}>{label}</Text> : null}
        </View>
      </View>
    </View>
  );
}
