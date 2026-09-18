import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

export interface DonutSegment {
  pct: number;
  color: string;
}

interface Props {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerValue: string;
  centerLabel: string;
}

// Multi-segment ring built from stacked stroke-dasharray circles (react-native-svg has no
// native arc-sector primitive), used for "System Availability".
export function DonutChart({ segments, size = 110, strokeWidth = 15, centerValue, centerLabel }: Props) {
  const r = (size - strokeWidth) / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G transform={`rotate(-90 ${c} ${c})`}>
          <Circle cx={c} cy={c} r={r} stroke={colors.border} strokeWidth={strokeWidth} fill="none" />
          {segments.map((seg, i) => {
            const dash = (seg.pct / 100) * circumference;
            const offset = -((cumulative / 100) * circumference);
            cumulative += seg.pct;
            return (
              <Circle
                key={i}
                cx={c}
                cy={c}
                r={r}
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={offset}
                fill="none"
              />
            );
          })}
        </G>
      </Svg>
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[typography.metricLarge, { fontSize: size * 0.16 }]}>{centerValue}</Text>
        <Text style={[typography.caption, { fontSize: size * 0.075 }]}>{centerLabel}</Text>
      </View>
    </View>
  );
}
