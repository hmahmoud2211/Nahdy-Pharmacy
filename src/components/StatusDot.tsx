import React from 'react';
import { View } from 'react-native';
import { colors } from '../theme/colors';

export type StatusKind = 'success' | 'warning' | 'danger' | 'disabled' | 'info';

const colorFor = (kind: StatusKind) => {
  switch (kind) {
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'danger':
      return colors.danger;
    case 'info':
      return colors.info;
    default:
      return colors.disabled;
  }
};

export function StatusDot({ kind = 'success', size = 6 }: { kind?: StatusKind; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colorFor(kind),
      }}
    />
  );
}
