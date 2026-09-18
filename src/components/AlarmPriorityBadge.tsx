import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function AlarmPriorityBadge({ priority }: { priority: 'High' | 'Medium' | 'Low' }) {
  const bg = priority === 'High' ? colors.dangerBg : priority === 'Medium' ? colors.warningBg : colors.warningLightBg;
  const fg = priority === 'High' ? colors.danger : priority === 'Medium' ? colors.warning : '#8A6D00';
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 1.5,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={[typography.caption, { color: fg, fontFamily: 'Inter_600SemiBold', fontSize: 8.5 }]}>
        {priority}
      </Text>
    </View>
  );
}
