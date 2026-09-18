import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  icon: ReactNode;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
  sub?: ReactNode;
  style?: ViewStyle;
}

// Used for the 7 dashboard KPI tiles.
export function MetricCard({ icon, iconBg, label, value, valueColor, sub, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={styles.textCol}>
        <Text style={typography.label} numberOfLines={2}>
          {label}
        </Text>
        <Text style={[typography.metricLarge, valueColor ? { color: valueColor } : null]} numberOfLines={1}>
          {value}
        </Text>
        {sub}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 11,
    paddingHorizontal: 12,
    gap: 9,
    minWidth: 0,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
});
