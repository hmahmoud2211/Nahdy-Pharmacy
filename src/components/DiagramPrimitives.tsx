import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Line, Circle, Rect, Path } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export type LineKind = 'normal' | 'warning' | 'alarm' | 'open';

export function lineColor(kind: LineKind) {
  switch (kind) {
    case 'warning':
      return colors.warning;
    case 'alarm':
      return colors.danger;
    case 'open':
      return colors.disabled;
    default:
      return colors.success;
  }
}

export function HLine({ kind = 'normal', height = 3 }: { kind?: LineKind; height?: number }) {
  const dashed = kind !== 'normal';
  return (
    <Svg width="100%" height={height + 2}>
      <Line
        x1="0"
        y1={(height + 2) / 2}
        x2="100%"
        y2={(height + 2) / 2}
        stroke={lineColor(kind)}
        strokeWidth={height}
        strokeDasharray={dashed ? '6,4' : undefined}
      />
    </Svg>
  );
}

export function VLine({
  kind = 'normal',
  width = 3,
  height = 20,
  topDot,
}: {
  kind?: LineKind;
  width?: number;
  height?: number;
  topDot?: boolean;
}) {
  const dashed = kind !== 'normal';
  const cx = (width + 2) / 2;
  return (
    <Svg width={width + 2} height={height}>
      <Line
        x1={cx}
        y1="0"
        x2={cx}
        y2="100%"
        stroke={lineColor(kind)}
        strokeWidth={width}
        strokeDasharray={dashed ? '6,4' : undefined}
      />
      {topDot && <Circle cx={cx} cy={2} r={3} fill={lineColor(kind)} />}
    </Svg>
  );
}

export function TowerIcon({ size = 40, color = colors.textSecondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Line x1={20} y1={2} x2={20} y2={30} stroke={color} strokeWidth={2} />
      <Line x1={8} y1={38} x2={20} y2={4} stroke={color} strokeWidth={2} />
      <Line x1={32} y1={38} x2={20} y2={4} stroke={color} strokeWidth={2} />
      <Line x1={11} y1={12} x2={29} y2={12} stroke={color} strokeWidth={2} />
      <Line x1={9} y1={22} x2={31} y2={22} stroke={color} strokeWidth={2} />
      <Line x1={4} y1={12} x2={11} y2={12} stroke={color} strokeWidth={1.5} />
      <Line x1={29} y1={12} x2={36} y2={12} stroke={color} strokeWidth={1.5} />
      <Circle cx={4} cy={12} r={2} fill={color} />
      <Circle cx={36} cy={12} r={2} fill={color} />
      <Circle cx={9} cy={22} r={2} fill={color} />
      <Circle cx={31} cy={22} r={2} fill={color} />
    </Svg>
  );
}

export function BreakerGlyph({ size = 44, status = 'Closed' as 'Closed' | 'Open' | 'Trip' }) {
  const color = status === 'Trip' ? colors.danger : status === 'Open' ? colors.disabled : colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Rect x={2} y={2} width={40} height={40} rx={4} stroke={color} strokeWidth={2} fill={colors.surface} />
      <Circle cx={14} cy={14} r={2.2} fill={color} />
      <Circle cx={14} cy={30} r={2.2} fill={color} />
      <Line
        x1={14}
        y1={14}
        x2={status === 'Open' ? 26 : 14}
        y2={status === 'Open' ? 22 : 30}
        stroke={color}
        strokeWidth={2}
      />
      <Circle cx={30} cy={14} r={2.2} fill={color} />
      <Circle cx={30} cy={30} r={2.2} fill={color} />
      <Line x1={30} y1={14} x2={30} y2={30} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function StatusPill({ status }: { status: 'Closed' | 'Open' | 'Trip' | 'Normal' }) {
  const bg = status === 'Trip' ? colors.danger : status === 'Open' ? colors.disabled : colors.success;
  return (
    <View style={{ backgroundColor: bg, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
      <Text style={{ color: colors.textInverse, fontFamily: 'Inter_700Bold', fontSize: 8.5 }}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
}

export function ValueRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 78 }}>
      <Text style={[typography.caption, { fontSize: 9 }]}>{label}</Text>
      <Text style={[typography.bodyStrong, { fontSize: 9, color: color ?? colors.textPrimary }]}>{value}</Text>
    </View>
  );
}
