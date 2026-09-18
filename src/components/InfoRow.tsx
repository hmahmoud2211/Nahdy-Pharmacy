import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { StatusDot, StatusKind } from './StatusDot';

interface Props {
  label: string;
  value: string;
  valueColor?: string;
  dotKind?: StatusKind;
  bold?: boolean;
  compact?: boolean;
}

// Label/value row used across System Information, Selected Feeder Details, Status columns, etc.
export function InfoRow({ label, value, valueColor, dotKind, bold, compact }: Props) {
  return (
    <View style={[styles.row, compact && styles.compactRow]}>
      <Text style={[typography.body, styles.label, { color: colors.textSecondary }]} numberOfLines={2}>
        {label}
      </Text>
      <View style={styles.valueWrap}>
        {dotKind && <StatusDot kind={dotKind} />}
        <Text
          style={[
            typography.body,
            {
              marginLeft: dotKind ? 6 : 0,
              color: valueColor ?? colors.textPrimary,
              fontFamily: bold ? 'Inter_600SemiBold' : 'Inter_400Regular',
              flexShrink: 1,
            },
          ]}
          numberOfLines={2}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 6,
    minWidth: 0,
  },
  compactRow: {
    paddingVertical: 2,
  },
  label: {
    flex: 1,
    minWidth: 0,
  },
  valueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '58%',
    flexShrink: 0,
    justifyContent: 'flex-end',
  },
});
