import React, { ReactNode } from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  icon: ReactNode;
  title: string;
  subtitle: string;
  style?: ViewStyle;
}

export function QuickActionButton({ icon, title, subtitle, style }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}>
      <View style={styles.iconWrap}>{icon}</View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={typography.bodyStrong} numberOfLines={1}>
          {title}
        </Text>
        <Text style={typography.caption} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 7,
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.borderStrong,
  },
  iconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
