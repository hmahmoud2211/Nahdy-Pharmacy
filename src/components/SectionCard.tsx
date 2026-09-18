import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Info } from 'lucide-react-native';

interface Props {
  title: string;
  titleColor?: string;
  right?: ReactNode;
  showInfoIcon?: boolean;
  headerBg?: string;
  headerTextColor?: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  children?: ReactNode;
  bare?: boolean;
  compact?: boolean;
}

// Generic white card used for most panels. `bare` renders a plain header (as used for the
// left-hand status/metric stacks); non-bare renders the dark teal banner header used for the
// three big header bars (DASHBOARD OVERVIEW / MDB SINGLE LINE DIAGRAM / UPS SYSTEM OVERVIEW).
export function SectionCard({
  title,
  titleColor,
  right,
  showInfoIcon,
  headerBg,
  headerTextColor,
  style,
  contentStyle,
  children,
  bare,
  compact,
}: Props) {
  return (
    <View style={[styles.card, style]}>
      {bare ? (
        <View style={[styles.bareHeaderRow, compact && styles.compactBareHeaderRow]}>
          <Text style={[typography.sectionTitle, titleColor ? { color: titleColor } : null]}>{title}</Text>
          {right}
        </View>
      ) : (
        <View style={[styles.bannerHeader, compact && styles.compactBannerHeader, { backgroundColor: headerBg ?? colors.primary }]}> 
          <View style={styles.bannerLeft}>
            <Text style={[typography.pageTitle, { color: headerTextColor ?? colors.textInverse, fontSize: 10.5 }]}>
              {title}
            </Text>
            {showInfoIcon && <Info size={11} color={headerTextColor ?? colors.textInverse} style={{ marginLeft: 5, opacity: 0.85 }} />}
          </View>
          {right}
        </View>
      )}
      <View style={[styles.content, compact && styles.compactContent, contentStyle]}>{children}</View>
    </View>
  );
}

export function CardHeaderButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={6}>
      <Text style={[typography.caption, { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 9 }]}>
        {label} {'›'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    minWidth: 0,
  },
  bareHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    height: 22,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    padding: 6,
    minWidth: 0,
  },
  compactBareHeaderRow: {
    paddingVertical: 2,
  },
  compactBannerHeader: {
    height: 19,
  },
  compactContent: {
    padding: 3,
  },
});
