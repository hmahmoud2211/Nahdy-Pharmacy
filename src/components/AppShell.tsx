import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Sidebar, ScreenKey } from './Sidebar';
import { AppHeader } from './AppHeader';
import { colors } from '../theme/colors';
import { useReferenceScale } from '../hooks/useReferenceScale';

interface Props {
  active: ScreenKey;
  onNavigate: (k: ScreenKey) => void;
  children: ReactNode;
}

export function AppShell({ active, onNavigate, children }: Props) {
  const { needsHorizontalScroll, contentWidth, scale, contentHeight } = useReferenceScale();

  const body = (
    <View style={[styles.row, contentWidth ? { width: contentWidth, height: contentHeight } : { flex: 1 }]}> 
      <Sidebar active={active} onNavigate={onNavigate} />
      <View style={{ flex: 1 }}>
        <AppHeader />
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.background }}
          contentContainerStyle={[styles.content, active === 'mdb' && styles.compactContent]}
          showsVerticalScrollIndicator={active !== 'mdb'}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );

  if (needsHorizontalScroll || !contentWidth) return <View style={styles.root}>{body}</View>;

  return (
    <View style={styles.root}>
      <View style={[styles.scaledViewport, { width: contentWidth * scale }]}>
        <View style={[styles.scaledBody, { width: contentWidth, height: contentHeight, transform: [{ scale }] }]}>{body}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  scaledViewport: {
    flex: 1,
    overflow: 'hidden',
  },
  scaledBody: {
    flex: 1,
    transformOrigin: 'top left' as any,
  },
  content: {
    padding: 10,
    gap: 9,
    flexGrow: 1,
  },
  compactContent: {
    padding: 4,
    gap: 3,
  },
});
