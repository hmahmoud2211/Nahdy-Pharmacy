import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowRight, CircleCheck } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  icon: ReactNode;
  title: string;
  sub: string;
  status: string;
  last?: boolean;
  wide?: boolean;
}

export function PowerPathNode({ icon, title, sub, status, last, wide }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.box, wide && { width: 150 }]}>
        <View style={styles.iconRow}>
          {icon}
          <CircleCheck size={13} color={colors.success} />
        </View>
        <Text style={typography.bodyStrong}>{title}</Text>
        <Text style={[typography.caption, { textAlign: 'center' }]} numberOfLines={2}>
          {sub}
        </Text>
        <Text style={[typography.caption, { color: colors.success, fontFamily: 'Inter_700Bold', marginTop: 2 }]}>
          {status}
        </Text>
      </View>
      {!last && (
        <View style={styles.arrow}>
          <ArrowRight size={16} color={colors.textMuted} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.surface,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  arrow: {
    paddingHorizontal: 6,
  },
});
