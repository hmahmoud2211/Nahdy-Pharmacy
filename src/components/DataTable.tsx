import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export interface Column<T> {
  key: string;
  label: string;
  flex?: number;
  align?: 'left' | 'right' | 'center';
  headerColor?: string;
  render: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  zebra?: boolean;
  bold?: (row: T) => boolean;
}

// Generic dense data-grid used for System Health by Category, Site Health Overview and
// Panel Summary - each of these is the same "colored status columns" table shape in the PDF.
export function DataTable<T>({ columns, data, keyExtractor, zebra, bold }: Props<T>) {
  return (
    <View>
      <View style={styles.headerRow}>
        {columns.map((col) => (
          <View key={col.key} style={{ flex: col.flex ?? 1, minWidth: 0, alignItems: alignItems(col.align) }}>
            <Text
              style={[typography.tableHeader, col.headerColor ? { color: col.headerColor } : null]}
              numberOfLines={1}
            >
              {col.label}
            </Text>
          </View>
        ))}
      </View>
      {data.map((row, i) => (
        <View
          key={keyExtractor(row, i)}
          style={[
            styles.dataRow,
            zebra && i % 2 === 1 ? { backgroundColor: colors.surfaceAlt } : null,
            bold?.(row) ? { backgroundColor: colors.surfaceAlt } : null,
          ]}
        >
          {columns.map((col) => (
            <View key={col.key} style={{ flex: col.flex ?? 1, minWidth: 0, alignItems: alignItems(col.align) }}>
              {col.render(row)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function alignItems(align?: 'left' | 'right' | 'center') {
  if (align === 'right') return 'flex-end';
  if (align === 'center') return 'center';
  return 'flex-start';
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minWidth: 0,
    gap: 8,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
});
