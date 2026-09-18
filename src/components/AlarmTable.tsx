import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { AlarmPriorityBadge } from './AlarmPriorityBadge';

export interface AlarmColumn {
  key: string;
  label: string;
  flex?: number;
  width?: number;
}

interface Props {
  columns: AlarmColumn[];
  rows: Record<string, string>[];
  priorityKey?: string;
  // When set, the table renders at this fixed content width inside a horizontal
  // ScrollView instead of squeezing columns - mirrors the horizontal scrollbar the
  // PDF itself shows under the wide 7-column dashboard Active Alarms table.
  minContentWidth?: number;
}

export function AlarmTable({ columns, rows, priorityKey = 'priority', minContentWidth }: Props) {
  const table = (
    <View style={minContentWidth ? { width: minContentWidth } : { minWidth: 0 }}>
      <View style={styles.headerRow}>
        {columns.map((c) => (
          <View key={c.key} style={c.width ? { width: c.width } : { flex: c.flex ?? 1, minWidth: 0 }}>
            <Text style={typography.tableHeader} numberOfLines={1}>
              {c.label}
            </Text>
          </View>
        ))}
      </View>
      {rows.map((row, i) => (
        <View key={i} style={styles.dataRow}>
          {columns.map((c) => (
            <View key={c.key} style={c.width ? { width: c.width } : { flex: c.flex ?? 1, minWidth: 0 }}>
              {c.key === priorityKey ? (
                <AlarmPriorityBadge priority={row[c.key] as any} />
              ) : (
                <Text style={typography.tableCell} numberOfLines={2}>
                  {row[c.key]}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  if (minContentWidth) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {table}
      </ScrollView>
    );
  }
  return table;
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 6,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 6,
    alignItems: 'flex-start',
  },
});
